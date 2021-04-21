import React from 'react'
import { Container } from 'react-bootstrap'
import AddGroupButton from './AddGroupButton'
import AddMediaButton from "./AddMediaButton"
import AddTextButton from "./AddTextButton"
import JoinGroupButton from "./JoinGroupButton"
import { useGroup } from "../../hooks/useGroup"
import Group from "./Group"
import File from "./File"
import Text from "./Text"
import GroupBreadCrumbs from "./GroupBreadCrumbs"
import { useParams, useLocation } from "react-router-dom"
import { ROOT_GROUP } from '../../hooks/useGroup'
import Navbar from "../layout/Navbar"

const Dashboard = () => {
    const { groupId } = useParams()
    const { state = {} } = useLocation()
    const { group, groups, childFiles } = useGroup(groupId, state.group)

    return (
        <>
        <Navbar />
        <div style={{height:"100%", backgroundColor:"#F6D7AF"}}>
        <Container fluid>
            <div className="d-flex align-items-center">
                <GroupBreadCrumbs currentGroup={group} style={{backgroundColor:"#F6D7AF"}}/>
                
            </div>
            <div>
                {!(group === ROOT_GROUP) &&
                <div>
                    <p style={{fontWeight:"bold"}}>Group Code: {groupId}</p>
                    <div className="d-flex">
                    <AddMediaButton currentGroup={group} />
                    <AddTextButton currentGroup={group}/>
                    </div>
                </div>
                }
            </div>
            <div>
                {(group === ROOT_GROUP) &&
                <div>
                    <AddGroupButton currentGroup={group} />
                    <JoinGroupButton />
                </div>
                }
            </div>
            {groups.length > 0 && (
                <div className="d-flex flex-wrap">
                    {groups.map(childGroup => (
                        <div 
                            key={group.id}
                            style={{ maxWidth: "250px" }}
                            className="p-2"
                        >
                            <Group group={childGroup} />
                        </div>
                    ))}
                </div>
            )}
            {groups.length > 0 && childFiles.length > 0 && <hr />}
            {childFiles.length > 0 && (
                <div className="d-flex flex-wrap">
                    {childFiles.map(childFile => (
                        <div 
                            key={childFile.id}
                            style={{ maxWidth: "250px" }}
                            className="p-2"
                        >   
                            {!childFile.isText &&
                                <File file={childFile} />
                            }
                            {childFile.isText &&
                                <Text file={childFile} />}
                        </div>
                    ))}
                </div>
            )}
        </Container>
    </div>
    </>
    )
}

export default Dashboard
