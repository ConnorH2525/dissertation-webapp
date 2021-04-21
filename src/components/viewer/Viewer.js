import React, { useState } from 'react'
import { useGroup } from "../../hooks/useGroup"
import { Button } from "react-bootstrap"
import { useParams, useLocation } from "react-router-dom"
import CenteredContainer from '../authentication/CenteredContainer'

const Viewer = () => {

    const { groupId } = useParams()
    const { state = {} } = useLocation()
    const { childFiles } = useGroup(groupId, state.group)
    const [i, setI] = useState(0)

    function next() {
        const increment = () => {
                if (i+1 === childFiles.length) {
                    setI(0)
                }
                else {
                    setI(i+1)
                }
            }

        console.log(i)

        return <Button variant="secondary" onClick={increment} style={{fontSize: "20px", left: "6vw", bottom: "1vh", backgroundColor:"#212121", borderColor:"#212121", position: "absolute"}}>
                    &gt;
                </Button>
    }

    function previous() {
        const decrement = () => {
            if (i-1 === -1) {
                setI(childFiles.length-1)
            }
            else {
                setI(i-1)
            }
        }

        console.log(i)

        return <Button variant="secondary" onClick={decrement} style={{fontSize: "20px", left: "1vw", bottom: "1vh", backgroundColor:"#212121", borderColor:"#212121", position: "absolute"}}>
                    &lt;
                </Button>
    }

//                

    return (
            <div style={{height: "100%", position: "relative", backgroundColor: "black"}}>
                {!childFiles[i] && (
                    <div>
                        <div style={{backgroundColor: "white"}}>
                        <CenteredContainer>
                            <h1>There is no media uploaded to this frame yet! :)</h1>
                        </CenteredContainer>
                        </div>
                    </div>
                )}
                {childFiles[i] && (
                    <div>
                        {!childFiles[i].isText && 
                            <div style={{transform: "translate(0, 50%)", backgroundColor: "black"}}>
                                <img
                                src={childFiles[i].url}
                                alt="example"
                                width="100%"/>
                            </div>
                        }
                        {childFiles[i].isText && 
                            <div style={{backgroundColor: "white"}}>
                            <CenteredContainer>
                                <h1>{childFiles[i].text}</h1>
                            </CenteredContainer>
                            </div>
                        }
                        <div className="ml-auto">
                            {next()}
                            {previous()}
                            <h1 style={{color: "white", margin: "0", bottom: "0", right: "0", padding: "1vh 30px", backgroundColor: "#0099FF", position: "absolute"}}>{childFiles[i].username}</h1>
                        </div>
                        
                    </div>
        )}
        </div>
    )
}

export default Viewer