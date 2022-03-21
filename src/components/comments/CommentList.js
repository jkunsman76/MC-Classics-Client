import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CommentsRepository } from "../../repositories/CommentsRepository"

export const CommentList = () => {
    const history = useHistory()
    const { postId } = useParams()
    const [comments, setComments] = useState([])

    const syncComments = () => {
        CommentsRepository.getAll().then(setComments)
    }

    useEffect(() => {
        syncComments()
    }, [])

    const handleDeleteComment = (id) => {
        CommentsRepository.delete(id).then(syncComments)
    }

    return (
        <>
            <button onClick={() => history.push(`comments/add`)} className="button">Add comment</button>
            {
                comments.map(comment => {
                    const userFullName = `${comment.author?.user?.first_name} ${comment.author?.user?.last_name}`
                    return (
                        <div key={comment.id}>
                            <div>{comment.content}</div>
                            <div>Commented by: {userFullName}</div>
                            {
                                comment.is_owner
                                    ?
                                    <div>
                                        <button
                                            className="button"
                                            onClick={() => handleDeleteComment(comment.id)}
                                        >Delete</button>
                                        <button
                                            className="button"
                                            onClick={() => history.push(`/posts/${postId}/comments/${comment.id}/edit`)}
                                        >Edit</button>
                                    </div>
                                    : ""
                            }
                            --------------------------------------
                        </div>
                    )
                })
            }
        </>
    )
}