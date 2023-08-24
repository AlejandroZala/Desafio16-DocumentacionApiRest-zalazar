import { Router } from "express";

const router= Router()

router.get('/loggerTest', (req,res)=>{
    req.logger.info(req.method)

    req.logger.fatal('LOGGER')
    req.logger.error('LOGGER')
    req.logger.warning('LOGGER')
    req.logger.info('LOGGER')
    req.logger.http('LOGGER')
    req.logger.debug('LOGGER')
    res.sendStatus(200)
})

export default router