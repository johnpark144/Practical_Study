import { useForm } from "react-hook-form";
import MouseMoveAnimate from "./MouseMoveAnimate"
import Lottie from 'react-lottie-player'
import lottieJson from '../../public/computer.json'

export default function ContactMe() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = data => { // 출력 예시 : {name: '박영환', email: 'vyckd354@gmail.com'}
      window.location.href = `mailto:vyckd354@gmail?subject=${data.subject}&body=Hi my name is ${data.name} ${data.message} (${data.email})`
    }  // 쿼리 보내는법 (mailto:보낼사람주소)
  
    return (<div className="relative">
      <MouseMoveAnimate />
      <Lottie
      loop
      animationData={lottieJson}
      play
      className="absolute bottom-2 left-[3%] w-[300px] h-[300px]"
    />
      <form className="flex flex-col space-y-2 text-black w-fit mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" className="contactInput z-20" type="text" />
        <input {...register("email", { required: true })} placeholder="Email" className="contactInput z-20" type="email"  />
        {errors.exampleRequired && <span>This field is required</span>}
        <input {...register("subject")} placeholder="Subject" className="contactInput z-20" type="text" />
        <input {...register("message")} placeholder="Message" className="contactInput z-20" type="text" />
        <input type="submit" className="bg-[#f7ab0a] py-5 px-10 rounded-md text-black font-bold text-lg z-20" />
      </form>
      </div>);
  }
