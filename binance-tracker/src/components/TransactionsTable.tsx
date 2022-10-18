import format from "date-fns/format";
import { BinanceTransaction } from "../types/BinanceTransaction";
import { getAssetLogo } from "../utils/getAssetLogo";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const TransactionsTable = ({
  transactions,
}: {
  transactions: BinanceTransaction[];
}) => {
  return (
    <div className="flex flex-col mt-5">
      <h6 className="text-lg mb-5 text-white font-semibold">Transactions</h6>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-600 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-600 text-gray-200">
              <thead className="bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Buy
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Sell
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900 divide-y divide-gray-600">
                {transactions.map((txn) => (
                  <tr key={txn.orderNo}>
                    <td className="px-6 py-4 whitespace-normal">
                      <span title={txn.orderNo}>
                        {format(new Date(txn.createTime), "MM/dd/yyyy HH:mm")}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-normal">
                      <span>{txn.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-normal">
                      {txn.buyAsset && (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {getAssetLogo(txn.buyAsset)}
                          </div>
                          <div>
                            + {+txn.buyAmount} {txn.buyAsset}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-normal">
                      {txn.sellAsset && (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {getAssetLogo(txn.sellAsset)}
                          </div>
                          <div>
                            - {+txn.sellAmount} {txn.sellAsset}
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-right">
                      {txn.price !== "0" &&
                        txn.sellAsset !== "PHP" &&
                        usdFormatter.format(+txn.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
