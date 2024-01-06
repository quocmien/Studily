import { dataTable, titleTable, titleTable2 } from './setting';

const Locks = () => {
  return (
    <div>
      <div className="table-tab-left">
        <table>
          <caption className="mb-1">Liquidity Lock</caption>
          <tr style={{ border: '0px !important', textAlign: 'left' }}>
            {titleTable.map((title, index) => (
              <th key={index} >{title}</th>
            ))}
          </tr>

          <tr>
            <td colSpan={3} className="color-none-value">
              The liquidity lock will appear here once the presale is finalised.
            </td>
          </tr>
        </table>
      </div>

      <div className="table-tab-left mt-3">
        <table>
          <caption className="mb-1">Token Locks</caption>
          <tr style={{ border: '0px !important', textAlign: 'left' }}>
            {titleTable2.map((title, index) => (
              <th key={index} >{title}</th>
            ))}
          </tr>

          <tr>
            <td colSpan={3} className="color-none-value">
              There have been no token locks created.
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default Locks;
