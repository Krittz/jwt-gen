function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className="text-center rounded-md px-2 py-3 bg-zinc-900 placeholder:text-neutral-400 text-gray-200 border border-purple-500 transition-all duration-200"
            {...props}
        />
    )
}
export default Input;