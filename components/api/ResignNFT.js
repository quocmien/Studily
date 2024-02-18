class ResignNFT {
  upload (body) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_REST_API}/upload`, {
          body: body,
          method: 'post',
        });
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }
}


export default  new ResignNFT();
