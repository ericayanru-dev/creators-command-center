import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ProductionPlan, ShootingChecklistItem } from '@/types';
import { MapPin, Clock, Camera, CheckSquare, Plus, Check } from 'lucide-react';

interface ContentProductionPlanProps {
  plan: ProductionPlan;
  checklist: ShootingChecklistItem[];
  onSavePlan: (updatedPlan: ProductionPlan) => void;
  onToggleChecklistItem: (itemId: string) => void;
  onAddChecklistItem: (label: string) => void;
}

export const ContentProductionPlanSection: React.FC<ContentProductionPlanProps> = ({
  plan,
  checklist,
  onSavePlan,
  onToggleChecklistItem,
  onAddChecklistItem,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState(plan.shootLocation || '');
  const [callTime, setCallTime] = useState(plan.callTime || '');
  const [shootDate, setShootDate] = useState(plan.shootDate || '');
  const [notes, setNotes] = useState(plan.readinessNotes || '');
  const [newChecklistText, setNewChecklistText] = useState('');

  const handleSave = () => {
    onSavePlan({
      ...plan,
      shootLocation: location,
      callTime,
      shootDate,
      readinessNotes: notes,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChecklistText.trim()) {
      onAddChecklistItem(newChecklistText.trim());
      setNewChecklistText('');
    }
  };

  const completedCount = checklist.filter((i) => i.completed).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Production & Logistics Card */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-sky-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Production Plan & Call Sheet
            </h3>
          </div>
          <Button variant="outline" size="sm" onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
            {isEditing ? 'Save Plan' : 'Edit Logistics'}
          </Button>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <Input
              label="Shoot Location / Studio"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Loft Studio - Room 4B"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Shoot Date"
                type="date"
                value={shootDate}
                onChange={(e) => setShootDate(e.target.value)}
              />
              <Input
                label="Call Time"
                value={callTime}
                onChange={(e) => setCallTime(e.target.value)}
                placeholder="09:30 AM"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Readiness & Lighting Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <span className="font-mono text-[10px] text-slate-400 uppercase block">Location</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {plan.shootLocation || 'No location set yet'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase block">Shoot Date</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {plan.shootDate || 'Not scheduled'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="font-mono text-[10px] text-slate-400 uppercase block">Call Time</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {plan.callTime || 'Not set'}
                  </span>
                </div>
              </div>
            </div>

            {plan.readinessNotes && (
              <div className="p-3 rounded-lg bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/50">
                <span className="font-mono text-[10px] uppercase font-bold text-sky-800 dark:text-sky-300 block mb-1">
                  Creative Notes
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {plan.readinessNotes}
                </p>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Shooting Checklist Card */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Shooting Checklist
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {completedCount}/{checklist.length} Completed
          </span>
        </div>

        <form onSubmit={handleAddChecklist} className="flex items-center gap-2">
          <Input
            value={newChecklistText}
            onChange={(e) => setNewChecklistText(e.target.value)}
            placeholder="Add checklist item..."
            className="flex-1"
          />
          <Button type="submit" variant="outline" size="md">
            Add
          </Button>
        </form>

        <div className="space-y-2 max-h-56 overflow-y-auto">
          {checklist.length === 0 ? (
            <p className="text-center text-xs text-slate-400 font-mono py-4">No checklist items yet.</p>
          ) : (
            checklist.map((item) => (
              <div
                key={item.id}
                onClick={() => onToggleChecklistItem(item.id)}
                className={`p-2.5 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                  item.completed
                    ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/40 dark:bg-emerald-950/20 text-slate-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      item.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`text-xs ${item.completed ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'}`}>
                    {item.label}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
