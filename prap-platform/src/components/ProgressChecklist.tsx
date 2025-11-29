import { CheckCircle, Circle } from "lucide-react";

type Item = { label: string; status: boolean; help?: string };

export default function ProgressChecklist({ checklist }: { checklist: Item[] }) {
  const completedCount = checklist.filter(item => item.status).length;
  const progressPercentage = (completedCount / checklist.length) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Readiness Checklist</h2>
          <p className="text-gray-600 mt-1">Complete these steps to be placement-ready</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">{completedCount}/{checklist.length}</div>
          <div className="text-sm text-gray-600">completed</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {checklist.map((item, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="mt-0.5">
              {item.status ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <div className={`font-medium ${item.status ? 'text-gray-900' : 'text-gray-700'}`}>
                {item.label}
              </div>
              {item.help && (
                <div className="text-sm text-gray-500 mt-1">{item.help}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}