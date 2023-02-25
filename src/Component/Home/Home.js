import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Home = () => {
    const { register, handleSubmit } = useForm();

    const imgHostKey = process.env.REACT_APP_imgbb_key;



    const handleAddFile = data => {
        const formData = new FormData();
        formData.append('image', data.image[0]);



        const url = `https://api.imgbb.com/1/upload?&key=${imgHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {

                    const files = {
                        name: result.image,
                        image: result.data.url
                    }

                    console.log(files)



                    /* fetch('https://file-uploader-server.vercel.app/uploadAFiles', {
                        method: 'POST',
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(files)
                    })
                        .then(res => res.json())
                        .then(data => {

                            toast.success('File added successful');

                        }) */
                }
            })
    }




    return (
        <div className='w-[400px] mx-auto'>
            <h1 className='text-2xl font-bold text-center mt-10 mb-4'>Add file</h1>

            <div className='card shadow-xl w-11/12 bg-gradient-to-r from-green-200 p-7'>
                <form onSubmit={handleSubmit(handleAddFile)}>
                    <label className="label">
                        <span className="label-text text-lg">Upload file here</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full" {...register("image")} />

                    <div className="flex flex-col w-full border-opacity-50">

                        <button className="w-full my-10 btn" type="submit">Add File</button>



                    </div>

                </form>
            </div>


        </div>
    );
};

export default Home;