import { useMutation, useQuery } from "@tanstack/react-query"
import { message } from "antd"
import { ClassMana, ClassManaStudentType } from "pages/ClassInfoPage/cpn-page/ClassManaPage/config/type"
import { client } from "server"
import { delayFetch } from "util/delayFetch"

export const useToGetClassList = (courseId: string, token: string) => {
  return useQuery([`classList-${courseId}`], async () => {
    await delayFetch()
    return client.get<ClassMana[]>({
      url: '/class/show',
      params: {
        courseId: courseId,
        token: token,
      }
    })
  }, {
    onSuccess: () => {
      message.success('查找成功')
    },
    onError: () => {
      message.error('查找失败')
    }
  }
  )
}


export const useDeleteClass = () => {
  return useMutation((id: string) => {
    return client.delete({ url: `/class/delete/${id}` })
  }, {
    onSuccess: () => {
      message.success('删除成功')
    },
    onError: () => {
      message.error('删除失败')
    }
  })
}

export const useCreateNewClass = () => {
  return useQuery([`newClass`], () => {
    return client.get<ClassMana>({
      url: '/class/create',
    })
  }, {
    onSuccess: () => {
      message.success('查找成功')
    },
    onError: () => {
      message.error('查找失败')
    }
  }
  )
}

export const useReName = () => {
  // classId:string,className:string
  return useMutation((props: { className: string, classId: string }) => {
    return client.put({
      url: '/class/update-name',
      params: {
        class_id: props.classId,
        class_name: props.className
      }
    })
  }, {
    onSuccess: () => {
      message.success('修改成功')
    },
    onError: () => {
      message.error('修改失败')
    }
  })
}

export const useShowStudent = (classId: string) => {
  return useQuery([`useShowStudent-${classId}`], () => {
    return client.get<ClassManaStudentType[]>(
      {
        url: '/class/show-student',
        params:{
          classId:classId
        }
      }
    )
  },{
    onSuccess: () => {
      message.success('查询成功')
    },
    onError: () => {
      message.error('查询失败')
    }
  })
}