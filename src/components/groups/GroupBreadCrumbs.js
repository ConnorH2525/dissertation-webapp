import React from 'react'
import { Breadcrumb } from "react-bootstrap"
import { ROOT_GROUP } from '../../hooks/useGroup'
import { Link } from "react-router-dom"

const GroupBreadCrumbs = ({ currentGroup }) => {
    let path = currentGroup === ROOT_GROUP ? [] : [ROOT_GROUP]
    if (currentGroup) path = [...path, ...currentGroup.path]

    return <Breadcrumb className="flex-grow-1"
            listProps={{ className: "bg-transparent m-0"}} >
                {path.map((group, index) => (
                    <Breadcrumb.Item
                    key={group.id}
                    linkAs={Link}
                    linkProps={{
                        to: {
                            pathname: group.id ? `/group/${group.id}` : "/",
                            state: { group: { ...group, path: path.slice(1, index) } }
                        }
                    }}
                    className="text-truncate d-inline-block" 
                    style = {{ maxWidth: "150px", color:"#FF6B09"}}
                >
                    {group.name}
                </Breadcrumb.Item>
                ))}
            {currentGroup && (
                <Breadcrumb.Item
                    className="text-truncate d-inline-block" 
                    style = {{ maxWidth: "200px" }}
                    active
                >
                    {currentGroup.name}
                </Breadcrumb.Item>
            )}
    </Breadcrumb>
}

export default GroupBreadCrumbs
