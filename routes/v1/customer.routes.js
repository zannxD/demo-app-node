import { DB } from '../../services/db.service';

const express =require('express');
const router = express.Router();

router.get('/customer', (req,res)=>{
    DB.getInstance().query('SELECT * from public.customers',(err, result) => {
        console.log(err, result)
        res.json(result)
        DB.getInstance().end()
      })
})


export const customerRoutes = router;