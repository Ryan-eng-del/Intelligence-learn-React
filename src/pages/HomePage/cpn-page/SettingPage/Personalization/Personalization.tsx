import { GithubOutlined, WechatOutlined, WeiboCircleOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { BaseLoading } from 'baseUI/BaseLoding/BaseLoading'
import React, { useEffect } from 'react'
import { useGetContributor } from 'server/fetch3rd'


type dataType = {
  html_url: string, // 首页链接
  login: string,  // 名字
  avatar_url: string  // 头像
}

export const Personalization = () => {
  const { data, isLoading } = useGetContributor()
  return (
    <>
      设置主题色<br />
      自定义首页
      <hr />
        制作方：广东技术师范大学
      <br />
        联系我们：{<span style={{fontSize:"30px"}}>
          <GithubOutlined style={{margin:"5px"}}/>
          <WeiboCircleOutlined style={{margin:"5px"}}/>
          <WechatOutlined style={{margin:"5px"}}/>
        </span>}
      <hr />
        项目贡献者：
        {
          isLoading ? <BaseLoading/> :
          (data as dataType[]).map(i=><>
            <span onClick={()=>window.open(i.html_url)} style={{margin:"5px"}}>
              <Tooltip title={i.login}>
                <Avatar src={i.avatar_url} size={30} />
              </Tooltip>
            </span>
          </>)
        }
    </>
  )
}