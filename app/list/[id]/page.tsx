'use client'

import { useParams } from 'next/navigation';

export const ListById = () => {

    const {id} = useParams();

    
    return (
        <div className="text-white p-10">
            ListById: {id}
        </div>
    );
};

export default ListById;