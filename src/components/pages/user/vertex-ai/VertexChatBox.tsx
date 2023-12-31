import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  KeyboardEvent,
} from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from '@/store/user'

import { VertexModel, chatContentSchema } from '@/utils/form'
import { fetchSkeetFunctions } from '@/lib/skeet'
import Image from 'next/image'
import { ChatRoom } from './VertexChatMenu'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextDecoder } from 'text-encoding'
import useToastMessage from '@/hooks/useToastMessage'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remark2Rehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import rehypeCodeTitles from 'rehype-code-titles'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import rehypeSlug from 'rehype-slug'
import rehypeExternalLinks from 'rehype-external-links'
import { ChatScreenQuery$variables } from '@/__generated__/ChatScreenQuery.graphql'
import { PreloadedQuery, graphql, usePreloadedQuery } from 'react-relay'
import {
  VertexChatBoxQuery,
  VertexChatBoxQuery$variables,
} from '@/__generated__/VertexChatBoxQuery.graphql'
import { sleep } from '@/utils/time'
import { CreateVertexMessageParams } from '@common/types/http/createVertexMessageParams'
import VertexChatExamples from './VertexChatExamples'

type ChatMessage = {
  id: string
  role: string
  createdAt: string
  updatedAt: string
  content: string
}

export const vertexChatBoxQuery = graphql`
  query VertexChatBoxQuery(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $chatRoomId: String
  ) {
    getVertexChatRoom(id: $chatRoomId) {
      id
      maxTokens
      title
      model
      temperature
      context
      topP
      topK
      createdAt
      updatedAt
      VertexChatRoomMessage {
        id
        content
      }
      VertexChatRoomExample {
        id
      }
    }
    getVertexChatRoomMessages(first: $first, vertexChatRoomId: $chatRoomId) {
      edges {
        node {
          id
          role
          content
          createdAt
          updatedAt
        }
      }
      pageInfo {
        hasNextPage
      }
      nodes {
        id
      }
    }
    ...VertexChatExamples_query
  }
`

const schema = z.object({
  chatContent: chatContentSchema,
})

type Inputs = z.infer<typeof schema>

type Props = {
  currentChatRoomId: string
  refetch: (variables: ChatScreenQuery$variables) => void
  chatBoxQueryReference: PreloadedQuery<
    VertexChatBoxQuery,
    Record<string, unknown>
  >
  chatBoxRefetch: (variables: VertexChatBoxQuery$variables) => void
}

export default function ChatBox({
  currentChatRoomId,
  refetch,
  chatBoxQueryReference,
  chatBoxRefetch,
}: Props) {
  const { t } = useTranslation()
  const user = useRecoilValue(userState)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null)
  const addToast = useToastMessage()

  const chatContentRef = useRef<HTMLDivElement>(null)
  const scrollToEnd = useCallback(() => {
    if (currentChatRoomId && chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight
    }
  }, [chatContentRef, currentChatRoomId])

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      chatContent: '',
    },
  })

  const chatContent = watch('chatContent')
  const chatContentLines = useMemo(() => {
    return (chatContent.match(/\n/g) || []).length + 1
  }, [chatContent])

  const data = usePreloadedQuery(vertexChatBoxQuery, chatBoxQueryReference)
  const getChatRoom = useCallback(() => {
    const chatRoomData = data.getVertexChatRoom
    if (chatRoomData) {
      setChatRoom({
        id: chatRoomData.id ?? currentChatRoomId,
        maxTokens: chatRoomData.maxTokens,
        title: chatRoomData.title ?? '',
        model: chatRoomData.model as VertexModel,
        temperature: chatRoomData.temperature,
        context: chatRoomData.context,
        createdAt: chatRoomData.createdAt,
        updatedAt: chatRoomData.updatedAt,
        topK: chatRoomData.topK,
        topP: chatRoomData.topP,
      })
    } else {
      console.warn('No such document!')
    }
  }, [currentChatRoomId, data.getVertexChatRoom])

  useEffect(() => {
    getChatRoom()
  }, [getChatRoom])

  const [isSending, setSending] = useState(false)

  const getUserChatRoomMessage = useCallback(async () => {
    const items = data?.getVertexChatRoomMessages?.edges
    if (items) {
      const messages: ChatMessage[] = []
      for await (const item of items) {
        const html = await unified()
          .use(remarkParse)
          .use(remarkDirective)
          .use(remarkGfm)
          .use(remark2Rehype)
          .use(rehypeSlug)
          .use(rehypeExternalLinks, {
            target: '_blank',
            rel: ['noopener noreferrer'],
          })
          .use(rehypeCodeTitles)
          .use(rehypeHighlight)
          .use(rehypeStringify)
          .process(item?.node?.content as string)

        messages.push({
          id: item?.node?.id,
          ...item?.node,
          content: html.value,
        } as ChatMessage)
      }

      setChatMessages(messages)
    }
  }, [data])

  useEffect(() => {
    void (async () => {
      try {
        await getUserChatRoomMessage()
      } catch (e) {
        console.error(e)
      }
    })()
  }, [getUserChatRoomMessage])

  useEffect(() => {
    if (chatMessages.length > 0) {
      scrollToEnd()
    }
  }, [chatMessages, scrollToEnd])

  const isDisabled = useMemo(() => {
    return isSending || errors.chatContent != null
  }, [isSending, errors.chatContent])

  const onSubmit = useCallback(
    async (inputs: Inputs) => {
      try {
        setSending(true)
        if (!isDisabled && user.uid && currentChatRoomId) {
          setChatMessages((prev) => {
            return [
              ...prev,
              {
                id: `UserSendingMessage${new Date().toISOString()}`,
                role: 'user',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                content: inputs.chatContent,
              },
              {
                id: `AssistantAnsweringMessage${new Date().toISOString()}`,
                role: 'assistant',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                content: '',
              },
            ]
          })
          const res = await fetchSkeetFunctions<CreateVertexMessageParams>(
            'skeet',
            'createVertexMessage',
            {
              vertexChatRoomId: currentChatRoomId,
              content: inputs.chatContent,
            },
          )
          const reader = await res?.body?.getReader()
          const decoder = new TextDecoder('utf-8')

          while (true && reader) {
            const { value, done } = await reader.read()
            if (done) break
            try {
              const dataString = decoder.decode(value)
              if (dataString != 'Stream done') {
                const data = JSON.parse(dataString)
                setChatMessages((prev) => {
                  const chunkSize = data?.text?.length
                  if (prev[prev.length - 1].content.length === 0) {
                    prev[prev.length - 1].content =
                      prev[prev.length - 1].content + data.text
                  }
                  if (
                    !prev[prev.length - 1].content
                      .slice(chunkSize * -1)
                      .includes(data.text)
                  ) {
                    prev[prev.length - 1].content =
                      prev[prev.length - 1].content + data.text
                  }

                  return [...prev]
                })
              }
            } catch (e) {
              console.warn(e)
            }
          }

          if (chatRoom && chatRoom.title == '') {
            await sleep(200)
            refetch({ first: 15 })
          }
          chatBoxRefetch({ first: 100, chatRoomId: currentChatRoomId })
          reset()
        }
      } catch (err) {
        console.error(err)
        if (
          err instanceof Error &&
          (err.message.includes('Firebase ID token has expired.') ||
            err.message.includes('Error: getUserAuth'))
        ) {
          addToast({
            type: 'error',
            title: t('errorTokenExpiredTitle'),
            description: t('errorTokenExpiredBody'),
          })
        } else {
          addToast({
            type: 'error',
            title: t('errorTitle'),
            description: t('errorBody'),
          })
        }
      } finally {
        setSending(false)
      }
    },
    [
      isDisabled,
      t,
      currentChatRoomId,
      user.uid,
      chatRoom,
      addToast,
      reset,
      refetch,
      chatBoxRefetch,
    ],
  )

  const onKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
        await handleSubmit(onSubmit)()
      }
    },
    [handleSubmit, onSubmit],
  )

  return (
    <>
      <div className="content-height-mobile sm:content-height w-full overflow-y-auto pt-4 sm:flex-1 sm:px-4 sm:pt-0">
        <div className="flex h-full w-full flex-col justify-between gap-4">
          <div
            ref={chatContentRef}
            className={clsx(
              chatContentLines > 4
                ? 'chat-height-5'
                : chatContentLines == 4
                ? 'chat-height-4'
                : chatContentLines == 3
                ? 'chat-height-3'
                : chatContentLines == 2
                ? 'chat-height-2'
                : 'chat-height-1',
              'w-full overflow-y-auto pb-24',
            )}
          >
            <div className={clsx('bg-gray-50 dark:bg-gray-800', 'w-full p-4')}>
              <div className="mx-auto flex w-full max-w-3xl flex-row items-start justify-start gap-4 p-4 sm:p-6 md:gap-6">
                {chatRoom?.model === 'chat-bison@001' && (
                  <Image
                    src={
                      'https://storage.googleapis.com/skeet-assets/imgs/bdlc/Bison.png'
                    }
                    alt="Bison icon"
                    className="my-3 aspect-square h-6 w-6 rounded-full sm:h-10 sm:w-10"
                    unoptimized
                    width={40}
                    height={40}
                  />
                )}
                {chatRoom?.model === 'chat-bison-32k' && (
                  <Image
                    src={
                      'https://storage.googleapis.com/skeet-assets/imgs/bdlc/Bison32k.png'
                    }
                    alt="Bison icon"
                    className="my-3 aspect-square h-6 w-6 rounded-full sm:h-10 sm:w-10"
                    unoptimized
                    width={40}
                    height={40}
                  />
                )}
                <div className="flex w-full flex-col">
                  <div className="pb-2">
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {chatRoom?.title ? chatRoom?.title : t('noTitle')}
                    </p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {chatRoom?.model}: {chatRoom?.maxTokens} {t('tokens')}
                    </p>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {'Temperature'}: {chatRoom?.temperature}, {'Top-p'}:{' '}
                      {chatRoom?.topP}, {'Top-k'}: {chatRoom?.topK}
                    </p>
                  </div>
                  <div className="prose w-full max-w-none dark:prose-invert lg:prose-lg">
                    <p className="text-base font-medium text-gray-800 dark:text-gray-50">
                      {chatRoom?.context}
                    </p>
                  </div>
                  <div className="pt-4">
                    <VertexChatExamples
                      currentChatRoomId={currentChatRoomId}
                      chatBoxData={data}
                    />
                  </div>
                </div>
              </div>
            </div>
            {chatMessages.map((chatMessage) => (
              <div
                key={chatMessage.id}
                className={clsx(
                  chatMessage.role === 'system' &&
                    'bg-gray-50 dark:bg-gray-800',
                  chatMessage.role === 'assistant' &&
                    'bg-gray-50 dark:bg-gray-800',
                  'w-full p-4',
                )}
              >
                <div className="mx-auto flex w-full max-w-3xl flex-row items-start justify-center gap-4 p-4 sm:p-6 md:gap-6">
                  {chatMessage.role === 'user' && (
                    <Image
                      src={user.iconUrl}
                      alt="User icon"
                      className="my-3 aspect-square h-6 w-6 rounded-full sm:h-10 sm:w-10"
                      unoptimized
                      width={40}
                      height={40}
                    />
                  )}
                  {(chatMessage.role === 'ai' ||
                    chatMessage.role === 'system' ||
                    chatMessage.role === 'assistant') &&
                    chatRoom?.model === 'chat-bison@001' && (
                      <Image
                        src={
                          'https://storage.googleapis.com/skeet-assets/imgs/bdlc/Bison.png'
                        }
                        alt="Bison icon"
                        className="my-3 aspect-square h-6 w-6 rounded-full sm:h-10 sm:w-10"
                        unoptimized
                        width={40}
                        height={40}
                      />
                    )}
                  {(chatMessage.role === 'ai' ||
                    chatMessage.role === 'system' ||
                    chatMessage.role === 'assistant') &&
                    chatRoom?.model === 'chat-bison-32k' && (
                      <Image
                        src={
                          'https://storage.googleapis.com/skeet-assets/imgs/bdlc/Bison32k.png'
                        }
                        alt="Bison icon"
                        className="my-3 aspect-square h-6 w-6 rounded-full sm:h-10 sm:w-10"
                        unoptimized
                        width={40}
                        height={40}
                      />
                    )}

                  <div className="flex w-full flex-col">
                    {chatMessage.role === 'system' && (
                      <div className="pb-2">
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          {chatRoom?.title ? chatRoom?.title : t('noTitle')}
                        </p>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {chatRoom?.model}: {chatRoom?.maxTokens} {t('tokens')}
                        </p>
                      </div>
                    )}
                    <div className="prose w-full max-w-none dark:prose-invert lg:prose-lg">
                      <div
                        className="w-full max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: chatMessage.content,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex w-full flex-row items-end gap-4">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="mx-auto flex w-full max-w-3xl flex-row items-end justify-between gap-4">
                <Controller
                  name="chatContent"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      onKeyDown={onKeyDown}
                      className={clsx(
                        chatContentLines > 4
                          ? 'h-48'
                          : chatContentLines == 4
                          ? 'h-36'
                          : chatContentLines == 3
                          ? 'h-28'
                          : chatContentLines == 2
                          ? 'h-20'
                          : `h-10`,
                        'flex-1 border-2 border-gray-900 p-1 font-normal text-gray-900 dark:border-gray-50 dark:bg-gray-800 dark:text-white sm:text-lg',
                      )}
                    />
                  )}
                />

                <button
                  type="submit"
                  disabled={isDisabled}
                  className={clsx(
                    'flex h-10 w-10 flex-row items-center justify-center',
                    isDisabled
                      ? 'bg-gray-300 hover:cursor-wait dark:bg-gray-800 dark:text-gray-400'
                      : 'bg-gray-900 hover:cursor-pointer dark:bg-gray-600',
                  )}
                >
                  <PaperAirplaneIcon className="mx-3 h-6 w-6 flex-shrink-0 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
