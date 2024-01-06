import { dataTable } from './setting';

const Table3 = () => {
  return (
    <div className='table-tab-left mt-3'>
        <table>
      <caption className='mb-1'>Token Details</caption>

          {dataTable.map((data, index) => (
            <tr key={index}>
              <td>{data.title}</td>
              <td>
                <p className='color-blue'>{data.data}</p>
              </td>
            </tr>
          ))}

          <tr>
            <td>Token Address</td>
            <td>
              <a
                className='color-blue-bold'
                style={{
                  textDecoration: 'underline',
                }}
                href='https://testnet.bscscan.com/token/0x768Ca416BdF1864Ca7735c98158312c65D4278cb'
              >
                0x768Ca416BdF1864Ca7735c98158312c65D4278cb
              </a>
              <p className='color-blue'>
                Do not send $BUSD to the token address{' '}
              </p>
            </td>
          </tr>
        </table>
      </div>
  )
}

export default Table3;