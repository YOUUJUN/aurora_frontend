/**
 * better error handler for async func
 *
 * @param asyncFunc
 * @param params
 * @returns {Promise<*[]>}
 */
 export async function errorCaptured(asyncFunc, ...params){
    try{
        let res = await asyncFunc(...params);
        return [null,res];
    }catch (e) {
        return [e, null];
    }
}