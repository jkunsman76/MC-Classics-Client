import { useState } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"
import { CommentsRepository } from "../../repositories/CommentsRepository"

export const CommentForm = () => {
    const history = useHistory()
    const { postId } = useParams()
    const [comment, updateComment] = useState({
        post: 0,
        content: ""
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        comment.post = parseInt(postId)
        CommentsRepository.add(comment)
            .then(() => history.push(`/posts/${postId}/comments`))
    }

    return (
        <>
            <textarea
                className="textarea"
                placeholder="Type your comment here!"
                onChange={(event) => {
                    const copy = { ...comment }
                    copy.content = event.target.value
                    updateComment(copy)
                }}>
            </textarea>
            <button className="button" onClick={handleSubmit}>Submit</button>
        </>
    )
}