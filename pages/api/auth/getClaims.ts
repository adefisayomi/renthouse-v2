import { viewCustomClaims } from "@/server/utils/firebaseAdmin";
import { errorMessage } from "@/src/constants";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler (req: NextApiRequest, res: NextApiResponse) {

    try {
       if (req.method === 'POST') {
            const {uid} = req.body
            if (!uid) throw new Error('invalid request')
                // 
            const claims = await viewCustomClaims(uid)
            res.send({
                success: true,
                message: 'done',
                data: claims
            })
       }
    }
    catch(err: any) {
        res.send(errorMessage(err.message))
    }
}