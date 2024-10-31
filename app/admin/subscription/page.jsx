"use client"
import SubscriptionTableItem from '@/components/adminComponents/SubscriptionTableItem'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Page = () => {
    const [emails, setEmails] = useState([])

    const fetchEmails = async () => {
        const res = await axios.get('/api/email');
        setEmails(res.data.emails);
    }

    const deleteEmail = async (mongoId) => {
        const res = await axios.delete(`/api/email?id=${mongoId}`);
        if(res.data.success) {
            toast.success(res.data.msg);
        }
        else{
            toast.error(res.data.msg);
        }
        fetchEmails();
    }

    useEffect(() => {
        fetchEmails();
    }, [])
    return (
        <div className='flex px-5 pt-5 sm:pt-12 sm:pl-16'>
            <h1>All Subscriptions</h1>
            <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-6 border border-gray-400 scrollbar-hide">
                <table className='w-full text-sm text-gray-500'>
                    <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope='col' className='px-6 py-3'>
                                Email Subscription
                            </th>

                            <th scope='col' className='hidden px-6 py-3 sm:block'>
                                Date
                            </th>

                            <th scope='col' className='px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.map((item,index)=>{
                            return <SubscriptionTableItem key={index} mongoId={item._id} email={item.email} date={item.date} deleteEmail={deleteEmail}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Page