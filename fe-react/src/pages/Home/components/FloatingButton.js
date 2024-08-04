import React from 'react'
import { FaShoppingCart, FaArrowDown } from 'react-icons/fa'

const FloatingButton = () => {
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        })
    }

    return (
        <div className="floating-button" onClick={scrollToBottom} aria-label="Scroll to bottom">
            <FaShoppingCart size={30} />
            <FaArrowDown size={30} />
        </div>
    )
}

export default FloatingButton
