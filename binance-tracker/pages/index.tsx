import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { AssetPerfomance } from "../src/components/AssetPerformance";
import { TransactionsTable } from "../src/components/TransactionsTable";
import { UpdateConfigModal } from "../src/components/UpdateConfigModal";
import { BinanceTransaction } from "../src/types/BinanceTransaction";

const Home: NextPage = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [transactions, setTransactions] = useState<BinanceTransaction[]>([]);
  const [updateConfigModalOpen, setUpdateConfigModalOpen] = useState(false);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    axios
      .get<BinanceTransaction[]>("/api/transactions")
      .then((res) => setTransactions(res.data));
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    setTransactions([]);

    try {
      const res = await axios.post<BinanceTransaction[]>("/api/sync");
      setTransactions(res.data);
    } catch (err) {
      alert("Unauthorized");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      <UpdateConfigModal
        open={updateConfigModalOpen}
        setOpen={setUpdateConfigModalOpen}
      />
      <div className="bg-black min-h-screen">
        <div className="mx-auto py-10 px-10" style={{ maxWidth: "100rem" }}>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setBlur((_) => !_)}
            >
              Blur
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setUpdateConfigModalOpen(true)}
            >
              Update config
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSync}
              disabled={isSyncing}
            >
              {isSyncing ? "Syncing..." : "Sync"}
            </button>
          </div>

          {transactions.length > 0 && (
            <>
              <AssetPerfomance transactions={transactions} blur={blur} />
              <TransactionsTable transactions={transactions} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
