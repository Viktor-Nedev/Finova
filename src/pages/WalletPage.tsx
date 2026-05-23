import { ArrowDownRight, ArrowUpRight, PiggyBank, TrendingUp, WalletCards } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "../components/Button";
import { ProgressBar } from "../components/ProgressBar";
import { savingGoals, walletTransactions } from "../data/lessons";

const spendingData = [
  { category: "Food", amount: 42 },
  { category: "Travel", amount: 24 },
  { category: "Fun", amount: 36 },
  { category: "School", amount: 18 },
  { category: "Saving", amount: 55 },
];

export function WalletPage() {
  const balance = walletTransactions.reduce((sum, item) => sum + item.amount, 500);

  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_22rem]">
      <section className="space-y-4">
        <div className="duo-card p-5">
          <p className="section-eyebrow">Wallet simulator</p>
          <h2 className="section-title">Practice with virtual money</h2>
          <p className="mt-2 font-bold text-slate-500">Try saving, spending, and investing moves without touching real cash.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[2rem] bg-duo-green p-5 text-white shadow-[0_7px_0_#12813b]">
            <WalletCards className="h-9 w-9 text-duo-yellow" />
            <p className="mt-4 text-sm font-black uppercase text-green-100">Fake balance</p>
            <p className="text-4xl font-black">${balance}</p>
          </div>
          <div className="duo-card p-5">
            <PiggyBank className="h-9 w-9 text-duo-green" />
            <p className="mt-4 text-sm font-black uppercase text-slate-400">Saved</p>
            <p className="text-4xl font-black text-slate-800">$645</p>
          </div>
          <div className="duo-card p-5">
            <TrendingUp className="h-9 w-9 text-duo-blue" />
            <p className="mt-4 text-sm font-black uppercase text-slate-400">Practice invested</p>
            <p className="text-4xl font-black text-slate-800">$225</p>
          </div>
        </div>

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
          <h3 className="text-2xl font-black text-slate-800">Saving goals</h3>
          <div className="mt-4 space-y-4">
            {savingGoals.map((goal) => (
              <div key={goal.id}>
                <div className="mb-2 flex justify-between font-black text-slate-700">
                  <span>{goal.title}</span>
                  <span>${goal.current}/${goal.target}</span>
                </div>
                <ProgressBar value={goal.current} max={goal.target} />
              </div>
            ))}
          </div>
        </section>

        <section className="duo-card p-5">
          <h3 className="text-2xl font-black text-slate-800">Recent moves</h3>
          <div className="mt-4 space-y-3">
            {walletTransactions.map((transaction) => (
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
          <Button className="mt-4 w-full">Add practice move</Button>
        </section>
      </aside>
    </div>
  );
}
