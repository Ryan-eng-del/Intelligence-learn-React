import React from 'react'
import {
  ChapterListHeaderWrapper,
  ChapterListTitleWrapper
  // ModalContextWrapper
} from './ChapterListStyle'
import { ChapterFolder } from './ChapterFolder/ChapterFolder'
import { ChapterFolderType } from './config/types'
import { useChapterList } from './config/servers/fetchChapterList'
import { BaseSpin } from 'baseUI/BaseSpin/BaseSpin'
// import { useMount } from 'hook/useMount'
import { useQueryClient } from '@tanstack/react-query'
import { AddTaskModal } from './AddTaskModal/AddTaskModal'

export const ChapterList: React.FC = () => {
  // 此页面的数据 (应该在完成网络请求后删除)
  const dataAlter: { code: number; msg: string; data: ChapterFolderType[] } = {
    code: 200,
    msg: '获取成功',
    data: [
      {
        chapterId: '53effCe2-1f1b-5e2b-AFB4-E1F5cE9B27FD',
        name: '流则张例',
        courTimes: [
          {
            tag: '近',
            name: 'Xfggvbj Vzcbtr Dmmbyvwi Iwanokefx Qbgx',
            taskId: 'eC9FaA1B-E19b-e70c-80Fe-9c3eE9B4cE6e'
          },
          {
            tag: '解',
            name: 'Rzfxbtxsk Cwrl Prmkax Dfbtfu Uwk',
            taskId: 'A82158fc-BBE7-d18D-aD09-fBd0EAECc8AA'
          },
          {
            tag: '实',
            name: 'Yubctf Euaxovurem Uivm Kctcmss Ypjlcwpcq',
            taskId: '4EFCFe66-9d9D-Da4D-2C35-91cCAc5DE02A'
          },
          {
            tag: '处',
            name: 'Wxlidl Ijkrcre Jurua Rfhkf Jkxdcxha Unyupbpypz Sxveosja',
            taskId: 'C38fC0B1-efEc-2EDB-Cedf-FcfB330cFD27'
          },
          {
            tag: '给',
            name: 'Hbqgifsdp Pgeqrrdyp Rcfg Frtvtl Owtugnke Xinnt',
            taskId: 'E8898f8f-5Ebf-B9A0-1fe7-AD0BCc4777Ec'
          }
        ],
        childChapters: [
          {
            chapterId: 'FC84C22f-e955-b36E-8755-92b2b1FFF2f8',
            name: '京离打月去',
            courTimes: [
              {
                tag: '路',
                name: 'Yio Hshp Vei Lqtxsclic Kqhctivzp Hhcv',
                taskId: 'c4BBD77D-f6De-AfC4-fbee-9cB5Dea4abDD'
              },
              {
                tag: '段',
                name: 'Qsee Idqjg Dseyoeytio Uqgdemf Ktet',
                taskId: 'a77dab8A-AEe0-eDbe-c73e-cE22A4cA14BF'
              },
              {
                tag: '为',
                name: 'Giljint Ojhbmflmn Rklov Lmqjuvevc Npucy Jlrq',
                taskId: '4d9c476b-4ae4-BD9c-258f-486DD05bA9fe'
              }
            ],
            childChapters: []
          },
          {
            chapterId: 'b9dE2FF3-Fe7f-e86e-ee6f-E13F5B6BFEdF',
            name: '收边没再劳比',
            courTimes: [
              {
                tag: '人',
                name: 'Pseipn Ohwl Vzbkfqut Olpyckkl Kikwjb',
                taskId: 'A3EDA8Ed-5D5B-65bD-8592-B86c57180CD2'
              },
              {
                tag: '构',
                name: 'Mwbpk Tdbommyru Fypwe Tftxgpxbxt',
                taskId: 'B21fDF4c-CCff-fc77-F59A-AFaD8669DdD3'
              },
              {
                tag: '想',
                name: 'Zep Ripspp Uuupinaen Ptnyvlr',
                taskId: '84623CCB-14Ab-898A-AdbB-4B59F26BD5a8'
              },
              {
                tag: '广',
                name: 'Swtug Hnwtbj Knk',
                taskId: 'ccF5Bc3f-DE1D-30e3-B4eA-c91Be79ee58F'
              },
              {
                tag: '持',
                name: 'Ibmoq Lnoo Uwworrcwf Rxcmnbgi Kslucrvj',
                taskId: 'c254c884-Fe0e-9aBB-3c0f-b75806eBEdD2'
              }
            ],
            childChapters: []
          }
        ]
      },
      {
        chapterId: 'EeFD4b59-35D7-caFA-C1cD-D58Bf9B4B3e7',
        name: '头劳间报打般学',
        courTimes: [
          {
            tag: '海',
            name: 'Fchrkqdom Rktbmwmsr Xmp Tnbvmris Piuvkpx Rfowvb',
            taskId: '27B552ff-967E-7bB3-8c0D-FB7BEE6dD4e3'
          },
          {
            tag: '应',
            name: 'Dgy Portp Bsqmcgph Qztre Hkmhiyt Hnejplsms',
            taskId: '70AF44A3-b764-6637-Bbf7-A36fcd328204'
          },
          {
            tag: '向',
            name: 'Errpno Jvyfs Huoumo Ktwlwwf Jykl Ntngwct Xljmpajnnn',
            taskId: 'eB4eAdDf-3b3D-881b-23bf-b61d0cf9E613'
          }
        ],
        childChapters: [
          {
            chapterId: 'E237cAC0-3C2f-FA50-8CAD-47FF336934dF',
            name: '成与后',
            courTimes: [
              {
                tag: '状',
                name: 'Mxboevj Iuwehqg Yybtscmu',
                taskId: '62A31CAE-B52e-1EB1-1EBc-D36edCC4FFFb'
              }
            ],
            childChapters: []
          },
          {
            chapterId: 'A03E6FCA-c8B1-994c-3BF5-632Bc375d7cA',
            name: '了物话么正',
            courTimes: [
              {
                tag: '容',
                name: 'Bbjhweg Belnnhghn Tkeel Hltuofcw Bsee',
                taskId: '214Ca089-9c93-d2F2-f2dd-Edc4982979be'
              },
              {
                tag: '指',
                name: 'Fdgig Igloedcdyx Jxry Lfj',
                taskId: 'bdf2A61A-de9F-9d7B-dfCd-6d7FE59e3f6B'
              },
              {
                tag: '改',
                name: 'Myfpabdo Ixnxeyu Kkruj Etkgx',
                taskId: '97e4Aa7E-88BA-3056-1f9a-d14dfB4e4Adc'
              },
              {
                tag: '界',
                name: 'Gryi Lmrf Niv Pixexlq Gsmc Gwxdlj',
                taskId: '4FEae38D-C613-dBFb-BEB3-42C6e15a9Cea'
              }
            ],
            childChapters: []
          },
          {
            chapterId: '1D98A086-e8bb-eEa7-5AAf-cb81cCae2b4A',
            name: '有入并片油',
            courTimes: [
              {
                tag: '领',
                name: 'Kjudm Umumu Vkqbhsf Qouwaalp',
                taskId: 'AE2eFb14-c632-013e-1299-2DF838d6Db48'
              },
              {
                tag: '置',
                name: 'Hprmurmyp Uokdifonxq Rth Gveinhsmrd Lcntq Nsvowa',
                taskId: '34F9Bbce-BA2D-ACEe-B3EB-EbD9E29EBF5f'
              }
            ],
            childChapters: []
          }
        ]
      },
      {
        chapterId: '8fF27Ec4-EE84-6aD7-c77B-5De9f7D9fd6B',
        name: '设质参第深值',
        courTimes: [
          {
            tag: '毛',
            name: 'Gougerg Npsblgart Dtuvx Dffrl Pkf Ejprifnxf Nmls',
            taskId: '5259cDd3-db87-aefc-B94d-d792c5cFdde5'
          },
          {
            tag: '打',
            name: 'Jiflfjbq Cvfe Loxixobngb Mlyrhrhxm Jumtynu',
            taskId: 'CbC39EEc-Cc70-96A4-Ca37-0202EaDf354B'
          },
          {
            tag: '叫',
            name: 'Ttfnxqgpjb Ohgktmpro Hfcknshg Rikc Sycjrp',
            taskId: '3De5cB6B-E824-5882-bdc2-58AafdEF0021'
          },
          {
            tag: '任',
            name: 'Nqc Pngru Hbiyjqivpb Miuohgrgyd Kixet',
            taskId: '5451F29F-3d3f-B35b-D143-2cEcFfBacC46'
          },
          {
            tag: '道',
            name: 'Wkfstew Eurwc Hktj Xpxu Elvt Uiqkmqd',
            taskId: '08670EfC-fE37-BaED-6aD5-26f0C1cA0FfC'
          }
        ],
        childChapters: [
          {
            chapterId: 'ECA7bD43-aCd8-BEcD-38A3-f7b8Be52ef18',
            name: '状建义',
            courTimes: [
              {
                tag: '领',
                name: 'Esfhv Pirwkvi Xgvnutgh Tbfhgamsje Kkpc',
                taskId: '116f4843-FeBe-BB44-FbCf-35Afffa4FdAb'
              },
              {
                tag: '前',
                name: 'Fknezubv Erapclbctc Yppfrkksoq Ltbcwmrhqd',
                taskId: 'be4AAAB7-4Dff-428E-3E22-0b7ee68BCcaA'
              },
              {
                tag: '么',
                name: 'Uynn Pkue Evoelei',
                taskId: '3bB355Ea-c1Bb-E43b-0EC5-e78FbDb6472A'
              },
              {
                tag: '完',
                name: 'Bqau Wbatzhdr Gbsjsh Qsbpjdimm',
                taskId: 'Db2A22fa-BDBD-AA4e-C95A-f9e978Df1fC7'
              }
            ],
            childChapters: []
          }
        ]
      },
      {
        chapterId: 'AE2ecd06-a3F3-3B8C-4190-B6cAA9ddFbFa',
        name: '效育持音红',
        courTimes: [
          {
            tag: '交',
            name: 'Xnbzasd Jimiwhe Hyufsrdt Mcosdvwfw Kjtuqow Sydxthtyv Ewebvyyj',
            taskId: '2BFC411e-Df2f-2ccf-32A7-0fce7ED1D70E'
          }
        ],
        childChapters: [
          {
            chapterId: 'F7D7b2d7-F1fb-F71d-4bE6-cdf4A11232B4',
            name: '而切起却争这',
            courTimes: [
              {
                tag: '指',
                name: 'Fljp Groyn Ecmap Hytuibfr Jxsfrxik',
                taskId: 'C8E46627-e8Dc-e3e5-D7b2-9C706706bb11'
              }
            ],
            childChapters: []
          },
          {
            chapterId: '1eA2deA7-36DA-379E-9E8F-BEF92EeBCFDC',
            name: '矿化局质规',
            courTimes: [
              {
                tag: '住',
                name: 'Ghiiee Uqrqm Ycmjqslbuc Qllvsml',
                taskId: '8E3b7B7d-fbc2-9d82-06fD-4bB611BAdCA5'
              }
            ],
            childChapters: []
          }
        ]
      },
      {
        chapterId: '77E8DEB1-EADA-ccf9-1d3b-a5eD73bA2D42',
        name: '接速起深决人',
        courTimes: [
          {
            tag: '必',
            name: 'Jgdwtdbw Dqcofoyug Ogxwumit',
            taskId: '437A28f4-1eFA-c062-CF7D-7CE75deebb12'
          },
          {
            tag: '需',
            name: 'Gmthxnknt Xbfxesxy Vesfkyxbfx Ibyvgdezxh Vuku',
            taskId: '25Bb38D9-95A6-DbCF-F2a0-11c09Ef4eb14'
          }
        ],
        childChapters: [
          {
            chapterId: 'e66e84BD-2e56-2AfD-7ddC-0D315899669F',
            name: '着被月县离',
            courTimes: [
              {
                tag: '年',
                name: 'Jedpo Kcous Lssrkfmn Ciudqct',
                taskId: 'Ac578b3e-DEC2-Db72-CFcb-a51fA6dCF6Eb'
              },
              {
                tag: '民',
                name: 'Xfsunsinm Gfkqiskz Focbegf Qpcld Whone',
                taskId: 'bC77E295-Ae1C-f92a-Ed61-4AA16bd7Db5D'
              },
              {
                tag: '验',
                name: 'Lqsvd Elip Yidibnxajs Rpc Howe',
                taskId: 'b192cEce-A284-119d-e389-4b0FBA8eCfb8'
              }
            ],
            childChapters: []
          },
          {
            chapterId: '5b552BDf-ddD3-7B9b-8c97-6B940af428d4',
            name: '道消研据决光',
            courTimes: [
              {
                tag: '石',
                name: 'Jtaer Cytlionj Buirnnvim Rgt Xueusrmfn Fest',
                taskId: 'CDe4188F-D8Ed-30df-cFFc-dc817cF53Cd5'
              },
              {
                tag: '海',
                name: 'Dtmlwgguo Wtivlzijet Tbxlyn Tzwxbj',
                taskId: '80f3EF6A-3A08-3bd8-CACb-e8EedD9dBBA8'
              },
              {
                tag: '门',
                name: 'Bxfpomii Aru Dneqm Hpxi Rrtbgc Snqtdqn',
                taskId: 'c1c9515E-fd12-fAB7-1b93-B0E8CCA2EE67'
              }
            ],
            childChapters: []
          },
          {
            chapterId: '420fAFfF-7Dd9-2d8e-3F73-8c82C094EBFE',
            name: '得取复些联',
            courTimes: [
              {
                tag: '车',
                name: 'Mbwm Utjmgfyn Tfrtbqul Bnlne Rscuhgs',
                taskId: 'f049e4c8-ECFB-fC17-a427-A7EcbB617cBf'
              },
              {
                tag: '北',
                name: 'Timgilnhr Rsqkpgjho Goiofhe',
                taskId: 'B2cd6b9C-1bba-38D0-b5ad-bbcc4C2db4fd'
              }
            ],
            childChapters: []
          }
        ]
      }
    ]
  }
  const courseId = '12345' //(应该作为参数传入此组件)
  const { mutate, isLoading } = useChapterList(courseId)
  // useMount(()=>mutate({courseId :courseId}))
  const queryClient = useQueryClient()
  const ChatperList = queryClient.getQueryData([`ChapterList-${courseId}`])
  console.log('List->', ChatperList)

  if (isLoading) return <BaseSpin title="正在查询中……"></BaseSpin>

  return (
    <>
      {/* 页头 */}
      <ChapterListHeaderWrapper>
        <ChapterListTitleWrapper>
          <div className="ChapterList-page-title">章节</div>
          {/* <Button
            type={'primary'}
            onClick={handleAddChapter}
            style={{ marginBottom: '24px' }}
          >
            添加章节
          </Button> */}
        </ChapterListTitleWrapper>
      </ChapterListHeaderWrapper>
      {/* 添加任务 */}
      <AddTaskModal></AddTaskModal>
      {/* 主体内容 */}
      <ChapterFolder data={dataAlter.data}></ChapterFolder>
    </>
  )
}
