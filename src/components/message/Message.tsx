import React, { useState, useEffect } from 'react'
import styles from "./style.module.css"

type MessageProps = {
    user: string,
    message: string,
    from: string | null
}

function Message(props: MessageProps) {
    return (
        props.user === props.from ? 
        <div className={styles.owner}>
            <p>{props.user}</p>
            <p>{props.message}</p>
        </div>
        :
        <div className={styles.other}>
            <p>{props.user}</p>
            <p>{props.message}</p>
        </div>
    )
}

export default Message

