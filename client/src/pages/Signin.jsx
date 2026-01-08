import { signin, general } from "../data/data"
import { Link } from "react-router-dom"


function Signin() {
    return (
        <div className="flex items-baseline justify-center max-w-7xl mx-auto max-h-screen py-30 gap-24">



            <div className="w-xl">
                <Link to="/"> <img src={general.logoWithText} alt="MegaMart logo" className="w-48 " /></Link>
                <h1 className="text-4xl font-bold mt-4 mb-3">{signin.title}</h1>
                <p>{signin.subtitle}</p>
                <img src={signin.shoppingIllustration} alt="" className="w-lg items-center" />
            </div>

            <div className="rounded-md border border-line bg-white p-8 w-sm">
                <form action="">
                    <p className="font-bold mb-6">{signin.formTitle}</p>
                    <div>
                        <input type="email" placeholder={signin.email} className="border border-line bg-gray-50 py-3 px-2 rounded-sm mb-2 w-full focus:border-primary active:border-primary " /> <br />
                        <input type="password" placeholder={signin.password} className="border border-line bg-gray-50  py-3 px-2 rounded-sm w-full focus:border-primary active:border-primary " />
                       <Link><p className="text-primary my-4 text-sm">{signin.forgot}</p></Link> 
                        <button type="submit" className=" bg-primary text-white font-semibold py-3 px-1 rounded-sm mb-2 w-full">{signin.button}</button>
                    </div>

                    <div className="flex gap-2 mb-5 ">
                        <input type="checkbox" />
                        <label htmlFor="" className="text-sm">{signin.keepSignedIn}</label>
                    </div>
                    <Link><p className="text-sm text-primary mb-4">{signin.createAccount}</p></Link>
                    <p className="text-sm">{signin.termsAccept}</p>
                    <p className="text-sm mt-6 text-gray-400 text-center">DEMO ( admin / admin123 )</p>
                </form>
            </div>

        </div>

    )
}
export default Signin