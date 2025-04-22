"use client";


import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaCheck, FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";


const SocialAuth = () => {
    const router = useRouter();


    const handleSocialLogin = (provider: string) => {
        toast.info(`${provider} Login Berhasil!`, {
            position: "top-right",
            icon: <FaCheck className="text-green-400" />,
        });


        
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000); 
    };


    return (
        <div className="space-y-6 mt-6"> {/* Menambah jarak dari tombol login */}
        {/* Garis dan teks "Atau Dengan" */}
        <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-500"></div>
            <p
                className="text-center my-4 text-gray-400"
                style={{ fontFamily: "'Baloo', cursive" }}
                >
                Atau Dengan
            </p>
            <div className="flex-grow border-t border-gray-500"></div>
        </div>


            <div className="flex space-x-4 justify-center">
                <button
                    onClick={() => handleSocialLogin("Google")}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-400"
                >
                    <FaGoogle className="text-xl text-red-600" />
                </button>
                <button
                    onClick={() => handleSocialLogin("Instagram")}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-400"
                >
                    <FaInstagram className="text-xl text-pink-600" />
                </button>
                <button
                    onClick={() => handleSocialLogin("Facebook")}
                    className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-400"
                >
                    <FaFacebook className="text-xl text-blue-600" />
                </button>
            </div>
        </div>
    );
};


export default SocialAuth;