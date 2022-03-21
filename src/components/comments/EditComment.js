import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CommentsRepository } from "../../repositories/CommentsRepository"

export const EditComment = () => {
    const history = useHistory()
    const { commentId } = useParams()
    const { postId } = useParams()
    const [comment, setComment] = useState({
        content: ""
    })

    useEffect(() => {
        CommentsRepository.getOne(commentId)
            .then(res => {
                setComment({
                    content: res.content
                })
            })
    }, [])

    const handleSubmitEdit = (event) => {
        event.preventDefault()
        CommentsRepository.update(commentId, comment)
            .then(() => history.push(`/posts/${postId}/comments`))
    }

    return (
        <>
            <textarea
                className="textarea"
                placeholder="Type your comment here!"
                value={comment.content}
                onChange={(event) => {
                    const copy = { ...comment }
                    copy.content = event.target.value
                    setComment(copy)
                }}>
            </textarea>
            <button className="button" onClick={handleSubmitEdit}>Confirm Edit</button>
        </>
    )
}