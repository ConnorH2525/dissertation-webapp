import { useReducer, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { database } from "../firebase"

const ACTIONS = {
    SELECT_GROUP: 'select-group',
    UPDATE_GROUP: 'update-folder',
    SET_GROUPS: "set-groups",
    SET_CHILD_FILES: "set-child-files"
}

export const ROOT_GROUP = { name: 'Groups', id: null, path: [] }

function reducer(state, { type, payload }) {
    switch(type) {
        case ACTIONS.SELECT_GROUP:
            return {
                groupId: payload.groupId,
                group: payload.group,
                groups: [],
                childFiles: []
            }
        case ACTIONS.UPDATE_GROUP:
            return {
                ...state,
                group: payload.group
            }
        case ACTIONS.SET_GROUPS:
            return {
                ...state,
                groups: payload.groups
            }
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles
            }
        default:
            return state
    }
}

export function useGroup(groupId = null, group = null) {
    const [state, dispatch] = useReducer(reducer, {
        groupId,
        group,
        groups: [],
        childFiles: []
    })
    const { currentUser } = useAuth()

    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_GROUP, payload: { groupId, group } })
    }, [groupId, group])

    useEffect(() => {
        if (groupId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_GROUP,
                payload: { group: ROOT_GROUP }
            })
        }

        database.groups
        .doc(groupId)
        .get()
        .then(doc => {
            dispatch({
                type: ACTIONS.UPDATE_GROUP,
                payload: { group: database.formatDoc(doc) }
            })
        }).catch(() => {
            dispatch({
                type: ACTIONS.UPDATE_GROUP,
                payload: { group: ROOT_GROUP}
            })
        })
    }, [groupId])

    useEffect(() => {
    return database.groups
        .where("parentId", "==", groupId)
        .where("members", "array-contains", currentUser.uid)
        .orderBy("createdAt")
        .onSnapshot(snapshot => {
            dispatch({
                type: ACTIONS.SET_GROUPS,
                payload: { groups: snapshot.docs.map(database.formatDoc) }
            })
        })  
    }, [groupId, currentUser])

    useEffect(() => {
        return database.files
            .where("groupId", "==", groupId)
            //.where("userId", "==", currentUser.uid)
            .orderBy("createdAt")
            .onSnapshot(snapshot => {
                dispatch({
                    type: ACTIONS.SET_CHILD_FILES,
                    payload: { childFiles: snapshot.docs.map(database.formatDoc) },
                })
            }) 
        }, [groupId, currentUser])

    return state
}