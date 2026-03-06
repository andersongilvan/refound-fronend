export function NotFound() {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div>
            <h1 className="text-gray-100 font-semibold text-2xl mb-10">
                Op's! Essa página não existe. 😑</h1>
            <a className="font-semibold text-center hover:text-green-200 transition ease-linear"
                href="/">Início</a>
        </div>

    </div>
}