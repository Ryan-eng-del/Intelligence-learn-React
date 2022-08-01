import React, { useReducer } from 'react'
import {
  ClassListWrapper,
  ClassListFont,
  ClassManaHeaderWrapper
} from './ClassManaPageStyle'
import { List, Button, Input, Modal } from 'antd'
import { ClassManaPageReducer, initialState } from './config/reducer'
export const ClassManaPage: React.FC = () => {
  const [state, dispatch] = useReducer(ClassManaPageReducer, initialState)
  const {
    modalVisible,
    classManaList,
    newClassName,
    inputClassName
    // searchKeyword
  } = state

  //重命名功能
  const renameFun = (curItem: any) => {
    dispatch({ type: 'rename', curItem })
  }

  //重命名确认的函数
  const renameFun_certain = (curItem: any) => {
    dispatch({ type: 'rename_certain', curItem }) //异步
  }

  //重命名取消的函数
  const renameFun_cancel = (curItem: any) => {
    dispatch({ type: 'rename_cancel', curItem })
    dispatch({ type: 'setNewClassName', payload: '' })
    console.log('取消')
  }

  //删除班级的函数
  const removeClassFun = (id: string) => {
    dispatch({ type: 'removeClass', id })
  }

  //打开模态框
  const showModal = () => {
    dispatch({ type: 'setModalVisible', payload: true })
  }

  //模态框的确认
  const setModalVisibleCertain = () => {
    dispatch({
      type: 'addClass',
      classManaItem: {
        id: '7',
        className: inputClassName,
        studentAmount: 0,
        renameState: false
      }
    })
    dispatch({ type: 'setModalVisible', payload: false })
    dispatch({ type: 'setClassName', payload: '' })
    console.log(inputClassName)
  }

  //模态框的取消
  const setModalVisibleCancel = () => {
    dispatch({ type: 'setModalVisible', payload: false })
    dispatch({ type: 'setClassName', payload: '' })
  }

  //搜索功能
  // const searchClassList = (keyword: string) => {
  //   //没做完，后端筛选返回较好
  //   if (keyword.trim()) {
  //     dispatch({ type: 'searchClassList', payload: keyword })
  //   } else {
  //     dispatch({ type: 'setSearchKeyword', payload: '' })
  //   }
  // }

  return (
    <>
      {/* 新建班级的模态框 */}
      <Modal
        title="请输入班级名称"
        centered
        visible={modalVisible}
        onOk={setModalVisibleCertain}
        onCancel={setModalVisibleCancel}
      >
        <Input
          placeholder="班级名称"
          id="classname"
          value={inputClassName}
          onChange={(e) => {
            dispatch({ type: 'setClassName', payload: e.target.value })
          }}
        />
      </Modal>
      <ClassListWrapper>
        <ClassManaHeaderWrapper>
          <Button type="primary" onClick={showModal}>
            +添加班级
          </Button>
          {/* <Input.Search
            id="setsearchkeyword"
            placeholder="请输入您要查询的班级"
            defaultValue={searchKeyword}
            onSearch={(e) => {
              if (e.trim()) {
                searchClassList(e)
              }
            }}
            style={{
              width: 300,
              marginLeft: 'auto',
              marginRight: '30px'
            }}
            onChange={(e) => {
              dispatch({
                type: 'setSearchKeyword',
                payload: e.target.value
              })
            }}
            allowClear
          /> */}
        </ClassManaHeaderWrapper>

        <ClassListFont>班级列表</ClassListFont>
        <List
          itemLayout="horizontal"
          dataSource={classManaList}
          size="large"
          renderItem={(item) => (
            <List.Item key={item.id} style={{ height: '80px' }}>
              {item.renameState ? (
                <div style={{ display: 'flex' }}>
                  <Input
                    placeholder="请输入新的班级名称"
                    id="newclassname"
                    style={{ width: '300px' }}
                    value={newClassName}
                    onChange={(e) => {
                      //改的名儿不为空
                      // if (e.target.value.trim()) {
                      dispatch({
                        type: 'setNewClassName',
                        payload: e.target.value
                      })
                      // }
                    }}
                  />
                  <Button
                    type="primary"
                    style={{
                      height: '37px',
                      width: '40px',
                      marginLeft: '30px',
                      color: 'white',
                      backgroundColor: 'green'
                    }}
                    onClick={() => {
                      renameFun_certain(item)
                    }}
                  >
                    √
                  </Button>
                  <Button
                    type="primary"
                    style={{
                      height: '37px',
                      width: '40px',
                      marginLeft: '10px',
                      color: 'white',
                      backgroundColor: 'red'
                    }}
                    onClick={() => {
                      renameFun_cancel(item)
                    }}
                  >
                    ×
                  </Button>
                </div>
              ) : (
                <List.Item.Meta
                  title={<a href="https://ant.design">{item.className}</a>}
                  description={'学生人数：' + item.studentAmount}
                />
              )}
              <div>
                <Button
                  type="link"
                  style={{ color: 'orange' }}
                  onClick={() => {
                    renameFun(item)
                  }}
                >
                  重命名
                </Button>
                <Button
                  type="link"
                  style={{ color: 'red' }}
                  onClick={() => {
                    removeClassFun(item.id)
                  }}
                >
                  删除
                </Button>
                <Button
                  type="link"
                  style={{ color: 'purple' }}
                  onClick={() => {
                    console.log('重命名')
                  }}
                >
                  管理
                </Button>
              </div>
            </List.Item>
          )}
        />
      </ClassListWrapper>
    </>
  )
}
