import { ArrowDownRight, ArrowUpRight, PiggyBank, RotateCcw, TrendingUp, WalletCards } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { useFinovaStore } from "../state/useFinovaStore";
import type { WalletTransaction } from "../types";

const categories = ["Food", "Travel", "Fun", "School", "Saving", "Income", "Investing"];

export function WalletPage() {
  const walletTransactions = useFinovaStore((state) => state.walletTransactions);
  const savingGoals = useFinovaStore((state) => state.savingGoals);
  const addWalletTransaction = useFinovaStore((state) => state.addWalletTransaction);
  const updateSavingGoal = useFinovaStore((state) => state.updateSavingGoal);
  const resetWalletSimulator = useFinovaStore((state) => state.resetWalletSimulator);
  const [label, setLabel] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("10");
  const [type, setType] = useState<WalletTransaction["type"]>("expense");

  const balance = walletTransactions.reduce((sum, item) => sum + item.amount, 500);
  const savedTotal = savingGoals.reduce((sum, goal) => sum + goal.current, 0);
  const investedTotal = walletTransactions
    .filter((transaction) => transaction.type === "investment")
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  const spendingData = useMemo(
    () =>
      categories.slice(0, 5).map((item) => ({
        category: item,
        amount: walletTransactions
          .filter((transaction) => transaction.category === item)
          .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0),
      })),
    [walletTransactions],
  );

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const parsedAmount = Number(amount);
    if (!label.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    addWalletTransaction({
      label: label.trim(),
      category,
      type,
      amount: type === "income" ? parsedAmount : -parsedAmount,
    });
    setLabel("");
    setAmount("10");
  };

  return (
    <div className="grid gap-4 2xl:grid-cols-[1fr_22rem]">
      <section className="space-y-4">
        <div className="duo-card p-5">
          <p className="section-eyebrow">Wallet simulator</p>
          <h2 className="section-title">Practice with virtual money</h2>
          <p className="mt-2 font-bold text-slate-500">
            Add practice income, expenses, and investments. Every move is saved locally and synced to Supabase when configured.
          </p>
        </div>

        <div className="grid gap-4 2xl:grid-cols-3">
          <div className="rounded-[2rem] bg-duo-green p-5 text-white shadow-[0_7px_0_#12813b]">
            <WalletCards className="h-9 w-9 text-duo-yellow" />
            <p className="mt-4 text-sm font-black uppercase text-green-100">Fake balance</p>
            <p className="text-4xl font-black">${balance.toFixed(0)}</p>
          </div>
          <div className="duo-card p-5">
            <PiggyBank className="h-9 w-9 text-duo-green" />
            <p className="mt-4 text-sm font-black uppercase text-slate-400">Saved</p>
            <p className="text-4xl font-black text-slate-800">${savedTotal.toFixed(0)}</p>
          </div>
          <div className="duo-card p-5">
            <TrendingUp className="h-9 w-9 text-duo-blue" />
            <p className="mt-4 text-sm font-black uppercase text-slate-400">Practice invested</p>
            <p className="text-4xl font-black text-slate-800">${investedTotal.toFixed(0)}</p>
          </div>
        </div>

        <form className="duo-card grid gap-3 p-5 2xl:grid-cols-[1fr_9rem_8rem_9rem_auto]" onSubmit={submit}>
          <input
            className="rounded-2xl border-2 border-duo-gray px-4 py-3 font-bold text-slate-700 outline-none focus:border-duo-green"
            placeholder="Practice move"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
          />
          <select
            className="rounded-2xl border-2 border-duo-gray px-3 py-3 font-black text-slate-600"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Transaction category"
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <input
            className="rounded-2xl border-2 border-duo-gray px-4 py-3 font-bold text-slate-700 outline-none focus:border-duo-green"
            type="number"
            min="1"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            aria-label="Amount"
          />
          <select
            className="rounded-2xl border-2 border-duo-gray px-3 py-3 font-black text-slate-600"
            value={type}
            onChange={(event) => setType(event.target.value as WalletTransaction["type"])}
            aria-label="Transaction type"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="investment">Investment</option>
          </select>
          <Button>Add</Button>
        </form>

        <section className="duo-card p-5">
          <h3 className="text-2xl font-black text-slate-800">Spending tracker</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingData} margin={{ top: 10, right: 12, left: -22, bottom: 0 }}>
                <CartesianGrid stroke="#EEF2F7" vertical={false} />
                <XAxis dataKey="category" tickLine={false} axisLine={false} stroke="#94A3B8" />
                <YAxis tickLine={false} axisLine={false} stroke="#94A3B8" />
                <Tooltip contentStyle={{ borderRadius: 20, border: "2px solid #E5E7EB" }} />
                <Bar dataKey="amount" fill="#16A34A" radius={[14, 14, 6, 6]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </section>

      <aside className="grid content-start gap-4">
        <section className="duo-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-2xl font-black text-slate-800">Saving goals</h3>
            <button className="icon-button" onClick={resetWalletSimulator} aria-label="Reset simulator">
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {savingGoals.map((goal) => (
              <div key={goal.id}>
                <div className="mb-2 flex justify-between font-black text-slate-700">
                  <span>{goal.title}</span>
                  <span>${goal.current}/${goal.target}</span>
                </div>
                <ProgressBar value={goal.current} max={goal.target} />
                <div className="mt-2 flex gap-2">
                  <Button variant="secondary" className="px-3 py-2 text-sm" onClick={() => updateSavingGoal(goal.id, goal.current + 10)}>
                    +$10
                  </Button>
                  <Button variant="secondary" className="px-3 py-2 text-sm" onClick={() => updateSavingGoal(goal.id, goal.current - 10)}>
                    -$10
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="duo-card p-5">
          <h3 className="text-2xl font-black text-slate-800">Recent moves</h3>
          <div className="mt-4 space-y-3">
            {walletTransactions.slice(0, 8).map((transaction) => (
              <div key={transaction.id} className="flex items-center gap-3 rounded-2xl bg-duo-soft p-3">
                <span className={`grid h-10 w-10 place-items-center rounded-xl ${transaction.amount >= 0 ? "bg-green-100 text-duo-green" : "bg-red-100 text-duo-red"}`}>
                  {transaction.amount >= 0 ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-black text-slate-800">{transaction.label}</p>
                  <p className="text-xs font-bold text-slate-500">{transaction.category}</p>
                </div>
                <span className="font-black text-slate-800">${Math.abs(transaction.amount)}</span>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
