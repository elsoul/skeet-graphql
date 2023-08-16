import { VertexChatExamples_query$key } from '@/__generated__/VertexChatExamples_query.graphql'
import LogoHorizontal from '@/components/common/atoms/LogoHorizontal'
import { vertexExampleFormSchema } from '@/utils/form'
import { Dialog, Transition } from '@headlessui/react'
import {
  AcademicCapIcon,
  PlusCircleIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { graphql, useMutation, usePaginationFragment } from 'react-relay'
import { z } from 'zod'

const vertexChatExamplesQuery = graphql`
  fragment VertexChatExamples_query on Query
  @refetchable(queryName: "VertexChatExamplesQuery") {
    getVertexChatRoomExamples(
      first: $first
      after: $after
      last: $last
      before: $before
      vertexChatRoomId: $chatRoomId
    ) @connection(key: "VertexChatExamples_getVertexChatRoomExamples") {
      edges {
        node {
          id
          input
          output
          createdAt
          updatedAt
        }
      }
      nodes {
        id
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`

type Inputs = z.infer<typeof vertexExampleFormSchema>

type Props = {
  currentChatRoomId: string
  chatBoxData: VertexChatExamples_query$key
}

export default function VertexChatExamples({
  currentChatRoomId,
  chatBoxData,
}: Props) {
  const { t } = useTranslation()
  const [isExamplesModalOpen, setExamplesModalOpen] = useState(false)
  const [isSending, setSending] = useState(false)

  const { data, refetch } = usePaginationFragment(
    vertexChatExamplesQuery,
    chatBoxData
  )

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    defaultValues: {
      inputOutputPairs:
        data.getVertexChatRoomExamples?.edges &&
        data.getVertexChatRoomExamples?.edges.length > 0
          ? data.getVertexChatRoomExamples?.edges.map((edge) => ({
              id: edge?.node?.id ?? '',
              input: edge?.node?.input,
              output: edge?.node?.output,
            }))
          : [
              {
                id: '',
                input: 'What is Skeet?',
                output:
                  'Open-Source Serverless Framework for full-stack apps on GCP (Google Cloud) and Firebase.',
              },
              {
                id: '',
                input: 'What is Epics?',
                output:
                  "Epics is a blockchain game (BCG) for Social Contribution. Let's realize a sustainable Open-Source software development environment for a better society.",
              },
            ],
    },
    resolver: zodResolver(vertexExampleFormSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inputOutputPairs',
  })

  const isDisabled = useMemo(() => {
    return isSending
  }, [isSending])
  console.log(data)

  const onSubmit = useCallback((data: Inputs) => {
    console.log(data)
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setExamplesModalOpen(true)
        }}
        className={clsx(
          'flex flex-row items-center justify-center border border-gray-600 px-2 py-1 hover:border-gray-400 dark:border-gray-200 dark:hover:border-gray-400'
        )}
      >
        <AcademicCapIcon className="mr-2 h-5 w-5 flex-shrink-0 text-gray-800 dark:text-white" />
        <span className="text-center text-sm font-bold text-gray-800 dark:text-white">
          {t('vertex-ai:learning')}
        </span>
      </button>
      <Transition appear show={isExamplesModalOpen} as={Fragment}>
        <Dialog
          as="div"
          onClose={() => setExamplesModalOpen(false)}
          className="fixed inset-0 z-10 overflow-y-auto"
        >
          <div className="flex min-h-screen w-full flex-col items-start justify-start bg-white dark:bg-gray-900">
            <div className="flex w-full flex-row items-center p-4">
              <LogoHorizontal className="w-24" />
              <div className="flex-grow" />
              <button
                onClick={() => {
                  setExamplesModalOpen(false)
                }}
                className="h-5 w-5 hover:cursor-pointer"
              >
                <XMarkIcon className="h-5 w-5 text-gray-900 hover:text-gray-800 dark:text-gray-50 dark:hover:text-gray-100" />
              </button>
            </div>
            <div className="flex w-full items-start gap-3 p-3 lg:mx-auto lg:max-w-7xl">
              <AcademicCapIcon className="w-8" />
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {t('vertex-ai:learning')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('vertex-ai:learningExplain')}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-3 p-3 lg:mx-auto lg:max-w-7xl">
              <form onSubmit={handleSubmit(onSubmit)}>
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="mb-8 flex h-full w-full flex-col gap-4 sm:flex-row"
                  >
                    <div className="flex h-48 w-full flex-col">
                      <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
                        {t('vertex-ai:input')} {index + 1}
                        {errors.inputOutputPairs &&
                          errors.inputOutputPairs[index]?.input && (
                            <span className="text-xs text-red-500 dark:text-red-300">
                              {' : '}
                              {t('vertex-ai:inputErrorText')}
                            </span>
                          )}
                      </p>
                      <Controller
                        name={`inputOutputPairs.${index}.input`}
                        control={control}
                        render={({ field }) => (
                          <textarea
                            style={{ resize: 'none' }}
                            {...field}
                            className={clsx(
                              'h-full flex-1 border-2 border-gray-900 p-1 font-normal text-gray-900 dark:border-gray-50 dark:text-white sm:text-lg'
                            )}
                          />
                        )}
                      />
                    </div>
                    <div className="flex h-48 w-full flex-col">
                      <p className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-50">
                        {t('vertex-ai:output')} {index + 1}
                        {errors.inputOutputPairs &&
                          errors.inputOutputPairs[index]?.output && (
                            <span className="text-xs text-red-500 dark:text-red-300">
                              {' : '}
                              {t('vertex-ai:outputErrorText')}
                            </span>
                          )}
                      </p>

                      <Controller
                        name={`inputOutputPairs.${index}.output`}
                        control={control}
                        render={({ field }) => (
                          <textarea
                            style={{ resize: 'none' }}
                            {...field}
                            className={clsx(
                              'h-full flex-1 border-2 border-gray-900 p-1 font-normal text-gray-900 dark:border-gray-50 dark:text-white sm:text-lg'
                            )}
                          />
                        )}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className=""
                    >
                      <TrashIcon className="h-5 w-5 text-gray-900 hover:text-gray-600 dark:text-gray-50 dark:hover:text-gray-300" />
                    </button>
                  </div>
                ))}
                <div className="my-8 flex w-full justify-end gap-4 pr-9">
                  <button
                    type="button"
                    onClick={() => append({ id: '', input: '', output: '' })}
                    className="flex items-center gap-2 border border-gray-600 px-2 text-gray-900 hover:border-gray-400 hover:text-gray-600 dark:border-gray-300 dark:text-gray-50 dark:hover:border-gray-400 dark:hover:text-gray-300"
                  >
                    <PlusCircleIcon className="h-5 w-5 text-gray-900 hover:text-gray-600 dark:text-gray-50 dark:hover:text-gray-300" />
                    {t('vertex-ai:addInputOutputPair')}
                  </button>
                  <button
                    type="submit"
                    className="bg-gray-900 px-4 py-2 text-white hover:bg-gray-600 dark:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    {t('vertex-ai:submit')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
