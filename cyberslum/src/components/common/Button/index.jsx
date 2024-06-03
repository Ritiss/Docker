export default function Button({ children, isActive, ...props }) {
    // через rest ... мы собираем все оставшиеся входящие параметры которые нам поступают
    return (
        <button 
        {...props}
        >
            {children}
        </button>
    )
}