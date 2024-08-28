import { setCustomUserClaims } from "@/server/utils/firebaseAdmin";
import { errorMessage } from "@/src/constants";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler (req: NextApiRequest, res: NextApiResponse) {

    try {
       if (req.method === 'POST') {
            const {uid, accountType} = req.body
            if (!uid || !accountType) throw new Error('invalid request')
                // 
            await setCustomUserClaims(uid, {accountType})
            res.send({
                success: true,
                message: 'done',
                data: {accountType}
            })
       }
    }
    catch(err: any) {
        res.send(errorMessage(err.message))
    }
}