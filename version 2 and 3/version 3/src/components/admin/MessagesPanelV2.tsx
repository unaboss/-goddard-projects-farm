'use client';

import { useState } from 'react';
import { markMessageAsRead } from '@/app/actions/admin/messages';

interface Message { id: string; name: string; email: string; phone: string | null; message: string; isRead: boolean; createdAt: string; }
interface Props { messages: Message[]; }

function MessageRow({ msg }: { msg: Message }) {
  const [isRead, setIsRead] = useState(msg.isRead);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr className="border-b border-subtle-earth/50 cursor-pointer hover:bg-subtle-earth/30" onClick={() => setExpanded(!expanded)}>
        <td className="py-3 pr-4"><span className={`inline-block w-2 h-2 rounded-full ${isRead ? 'bg-forest-canopy' : 'bg-dusty-clay'}`} title={isRead ? 'Read' : 'Unread'} /></td>
        <td className="py-3 pr-4 text-warm-cream whitespace-nowrap">{msg.name}</td>
        <td className="py-3 pr-4 text-dusty-clay whitespace-nowrap">{msg.email}</td>
        <td className="py-3 pr-4 text-dusty-clay whitespace-nowrap">{new Date(msg.createdAt).toLocaleDateString('en-ZA')}</td>
        <td className="py-3 text-dusty-clay max-w-xs truncate">{msg.message.slice(0, 120)}{msg.message.length > 120 ? '\u2026' : ''}</td>
        <td className="py-3 pl-2">
          {!isRead && (
            <button onClick={async (e) => { e.stopPropagation(); const r = await markMessageAsRead(msg.id); if (r.success) setIsRead(true); }}
              className="text-xs text-harvest-gold hover:underline whitespace-nowrap">Mark Read</button>
          )}
        </td>
      </tr>
      {expanded && (
        <tr><td colSpan={6} className="py-3 px-4 bg-subtle-earth/50 text-warm-cream text-sm">
          <p className="mb-1"><strong>From:</strong> {msg.name} ({msg.email}){msg.phone ? ` \u2014 ${msg.phone}` : ''}</p>
          <p className="mb-1"><strong>Date:</strong> {new Date(msg.createdAt).toLocaleString('en-ZA')}</p>
          <p className="whitespace-pre-wrap">{msg.message}</p>
        </td></tr>
      )}
    </>
  );
}

export function MessagesPanelV2({ messages }: Props) {
  return (
    <div className="bg-rich-soil rounded-lg p-6">
      <h2 className="font-heading text-xl text-harvest-gold mb-4">Contact Messages</h2>
      {messages.length === 0 ? <p className="text-dusty-clay text-sm">No messages yet.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b border-subtle-earth text-dusty-clay text-xs uppercase tracking-wider">
              <th className="pb-3 pr-4">Status</th><th className="pb-3 pr-4">Name</th><th className="pb-3 pr-4">Email</th><th className="pb-3 pr-4">Date</th><th className="pb-3">Message</th><th className="pb-3"></th>
            </tr></thead>
            <tbody>{messages.map((msg) => <MessageRow key={msg.id} msg={msg} />)}</tbody>
          </table>
        </div>
      )}
      <p className="mt-4 text-xs text-dusty-clay">{messages.length} message{messages.length !== 1 ? 's' : ''} total</p>
    </div>
  );
}
