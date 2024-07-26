import { useState } from 'react';
import {Eye, EyeSlash} from 'react-bootstrap-icons';
import {useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import useFirebase from '../hooks/useFirebase';

const clsInputLabel = "block mb-1 text-sm text-gray-600 dark:text-gray-400"
const clsInput = "border w-full min-w-0 px-3 py-2 rounded-md bg-gray-50 shadow dark:text-gray-700"
const clsInputErr = "text-sm text-red-500 mt-2"

function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const {handleSubmit, register, formState: { errors:formErr }} = useForm()
  const { fbUploadImageNdGetUrl, fbCreateUser } = useFirebase()

  // onSubmit form -> create new account 
  const onSubmit = async formData => {
    try {
      const {email, password, name, photo} = formData
      // check for valid photo type; if not, then return with a warning
      if ( !(photo && ['image/jpeg', 'image/png'].includes(photo[0].type)) ) {
        alert('please choose png or jpg image!')
        return
      }
  
      
      // host profile image and get photo-url
      const {url} = await fbUploadImageNdGetUrl(`profileImages/${email}`, photo[0])
      // create account req
      await fbCreateUser(email, password, name, url)
  
      alert('successfully created account!')
    } catch (error) {
      console.log(error.message);
    }
  }


  return (  
    <section className="px-4 py-8 dark:bg-gray-800 dark:text-gray-200" >
      <div className="max-w-md mx-auto p-6 border rounded-md shadow-md">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">Create an account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block mb-4">
            <span className={clsInputLabel}>Your name</span>
            <input type="text" {...register('name', {required:true})} className={clsInput} />
            {formErr.name && <p className={clsInputErr}>This field is required</p>}
          </label>

          <label className="block mb-4">
            <span className={clsInputLabel}>Your photo (optional)</span>
            <input type="file" {...register('photo', {required:true})} className={clsInput} />
            {formErr.photo && <p className={clsInputErr}>This field is required</p>}
          </label>

          <label className="block mb-4">
            <span className={clsInputLabel}>Your email</span>
            <input type="email" {...register('email', {required:true})} className={clsInput} />
            {formErr.email && <p className={clsInputErr}>This field is required</p>}
          </label>
          
          <label className="block mb-4 relative">
            <span className={clsInputLabel}>Your password</span>
            <div>

              <input type={showPassword ? "text" : "password"} {...register('password', {required:true, pattern: /(?=.*[a-z])(?=.*[A-Z]).{6,}/ })} className={clsInput} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-8 right-1.5 p-1 text-xl">
                {showPassword ? <Eye /> : <EyeSlash />}
              </button>
            </div>
            {formErr.password?.type==='required' && <p className={clsInputErr}>This field is required</p>}
            {formErr.password?.type==='pattern' && <p className={clsInputErr}>Password length must be at least 6 characters; contains 1 uppercase, 1 lowercase letter</p>}
          </label>

          <div className="mt-6">
            <button type="submit" className="bg-blue-600 text-white w-full px-4 py-2 rounded-md hover:opacity-90">Create account</button>
          </div>
        </form>

        {/* link */}
        <div className="border-t pt-6 mt-6">
          <p>Already have an account? <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">Login now</Link></p>
        </div>

      </div>
    </section>
  );
}

export default Register;