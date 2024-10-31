import React from 'react'

const SubscriptionTableItem = ({email, date, deleteEmail, mongoId}) => {
    const emailDate = new Date(date);
    return (
            <tr className='text-left bg-white border-b'>
                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                    {email? email : "No Email"}
                </th>
                <td className='hidden px-6 py-4 sm:block'>{emailDate.toDateString()}</td>
                <td onClick={() => deleteEmail(mongoId)} className='px-6 py-4 text-white bg-red-600 border border-black cursor-pointer'>x</td>
            </tr>
    )
}

export default SubscriptionTableItem