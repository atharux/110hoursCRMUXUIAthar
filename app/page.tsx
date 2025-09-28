'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Download, Phone, Mail, MessageSquare, Edit, User, 
  Bell, Settings, Plus, Play, Pause, MoreHorizontal, Calendar,
  BarChart3, Users, Workflow, PhoneCall, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CRMSystem = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [leadTypeFilter, setLeadTypeFilter] = useState('Fresh Leads');
  const [leadAgeFilter, setLeadAgeFilter] = useState('Last 30 Days');
  const [sortBy, setSortBy] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDialerActive, setIsDialerActive] = useState(false);

  // Sample data
  const leadsData = [
    {
      id: 1,
      name: 'Michael Thompson',
      company: 'Ford Jan 15 2024',
      location: 'Miami, FL',
      email: 'mthompson.auto@gmail.com',
      phone: '(305) 847 2156',
      vehicle1: '/api/placeholder/60/40',
      vehicle2: '/api/placeholder/60/40',
      progress: [true, true, true, true, false],
      unread: 2,
      missed: 1,
      status: 'Expert',
      lastContact: '2 days ago',
      leadScore: 85,
      source: 'Website'
    },
    {
      id: 2,
      name: 'Jessica Rodriguez',
      company: 'Toyota Mar 8 2024',
      location: 'Orlando, FL',
      email: 'jessica.r.cars@yahoo.com',
      phone: '(407) 923 4781',
      vehicle1: '/api/placeholder/60/40',
      vehicle2: '/api/placeholder/60/40',
      progress: [true, true, false, false, false],
      unread: 2,
      missed: 1,
      status: 'Warm',
      lastContact: '1 day ago',
      leadScore: 72,
      source: 'Facebook'
    },
    {
      id: 3,
      name: 'David Chen',
      company: 'Honda Feb 28 2024',
      location: 'Jacksonville, FL',
      email: 'd.chen.deals@outlook.com',
      phone: '(904) 556 9342',
      vehicle1: '/api/placeholder/60/40',
      vehicle2: '/api/placeholder/60/40',
      progress: [true, true, true, true, true],
      unread: 0,
      missed: 1,
      status: 'Hot',
      lastContact: '3 hours ago',
      leadScore: 95,
      source: 'Referral'
    },
    {
      id: 4,
      name: 'Amanda Williams',
      company: 'Nissan Jan 22 2024',
      location: 'Tampa, FL',
      email: 'awilliams.auto@hotmail.com',
      phone: '(813) 674 8920',
      vehicle1: '/api/placeholder/60/40',
      vehicle2: '/api/placeholder/60/40',
      progress: [true, false, false, false, false],
      unread: 1,
      missed: 1,
      status: 'Cold',
      lastContact: '1 week ago',
      leadScore: 45,
      source: 'Google Ads'
    }
  ];

  const sequencesData = [
    {
      id: 1,
      name: 'Welcome Series',
      type: 'email',
      status: 'Active',
      lastUpdated: 'Just now',
      description: 'New customer form entry'
    },
    {
      id: 2,
      name: 'Welcome Series 3',
      type: 'sms',
      status: 'Paused',
      lastUpdated: 'Today at 2:14/week',
      description: 'After customer contacts you via sms'
    },
    {
      id: 3,
      name: 'Follow-up Sequence',
      type: 'email',
      status: 'Draft',
      lastUpdated: 'Last week',
      description: 'Post-visit follow up'
    }
  ];

  // Navigation component
  const Navigation = () => (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-800 border-b border-gray-700">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-black font-bold text-sm">
            T3
          </div>
          <span className="text-white font-medium capitalize">{activeView}</span>
        </div>
        
        <div className="flex gap-4 text-sm">
          <div className="bg-gray-700 px-3 py-2 rounded">
            <div className="text-xl font-bold text-white">24</div>
            <div className="text-gray-400">Unread</div>
          </div>
          <div className="bg-gray-700 px-3 py-2 rounded">
            <div className="text-xl font-bold text-white">12</div>
            <div className="text-gray-400">New</div>
          </div>
          <div className="bg-gray-700 px-3 py-2 rounded">
            <div className="text-xl font-bold text-white">15</div>
            <div className="text-gray-400">Call Queue</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-gray-300" />
        </div>
      </div>
    </div>
  );

  // Sidebar component
  const Sidebar = () => {
    const navItems = [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'leads', icon: Users, label: 'Leads' },
      { id: 'sequences', icon: Workflow, label: 'Sequences' },
      { id: 'dialer', icon: PhoneCall, label: 'Dialer' }
    ];

    return (
      <div className="w-16 bg-gray-800 border-r border-gray-700 flex flex-col items-center py-4 gap-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-10 h-10 rounded flex items-center justify-center transition-colors ${
              activeView === item.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
          </button>
        ))}
      </div>
    );
  };

  // Dashboard View
  const DashboardView = () => (
    <div className="p-6 space-y-6">
      <div className="bg-purple-600 px-6 py-3 rounded-lg">
        <div className="flex items-center gap-2 text-white">
          <Phone className="w-5 h-5" />
          <span className="font-medium">INCOMING LEADS!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-400">Goals Progress</h3>
            <MoreHorizontal className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">64%</div>
            <div className="text-gray-400">137/236 This Month</div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-blue-400" />
            <h3 className="text-gray-400">Email Sent</h3>
          </div>
          <div className="text-3xl font-bold text-white">1,251</div>
          <div className="text-gray-400">Mail</div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare className="w-5 h-5 text-green-400" />
            <h3 className="text-gray-400">SMS Sent</h3>
          </div>
          <div className="text-3xl font-bold text-white">43</div>
          <div className="text-gray-400">Messages</div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Phone className="w-5 h-5 text-orange-400" />
            <h3 className="text-gray-400">Voice Mail</h3>
          </div>
          <div className="text-3xl font-bold text-white">162</div>
          <div className="text-gray-400">Contacts</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-white font-semibold mb-4">LEAD SOURCES</h3>
          <div className="text-2xl font-bold text-white mb-2">236 Leads</div>
          <div className="text-red-400 text-sm mb-4">↓ 4%</div>
          <div className="bg-gray-700 h-48 rounded flex items-center justify-center">
            <span className="text-gray-400">Chart Placeholder</span>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h3 className="text-white font-semibold mb-4">Sources</h3>
          <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold">341</span>
          </div>
          <div className="space-y-2">
            {['Agency', 'Marketing', 'Communication', 'Web Development', 'Travel'].map((source, index) => (
              <div key={source} className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                <span className="text-gray-300 text-sm">{source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <LeadsTable showHeader={false} />
    </div>
  );

  // Common components
  const ProgressIndicator = ({ progress }: { progress: boolean[] }) => (
    <div className="flex gap-1">
      {progress.map((completed, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full ${
            completed ? 'bg-green-500' : 'bg-gray-600'
          }`}
        />
      ))}
    </div>
  );

const StatusBadge = ({ status }: { status: string }) => {
  const colors: { [key: string]: string } = {
    'Hot': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Warm': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Expert': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Cold': 'bg-gray-500/20 text-gray-300 border-gray-500/30'
  };
  
  return (
    <span className={`px-2 py-1 rounded text-xs border ${colors[status] || colors.Cold}`}>
      {status}
    </span>
  );
};

  // Leads Table component
  const LeadsTable = ({ showHeader = true }) => {
    const filteredLeads = useMemo(() => {
      return leadsData.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm)
      );
    }, [searchTerm]);

    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        {showHeader && (
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold text-white">{filteredLeads.length} Leads</h1>
              
              <div className="flex items-center gap-4">
                <select 
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  value={leadTypeFilter}
                  onChange={(e) => setLeadTypeFilter(e.target.value)}
                >
                  <option>Fresh Leads</option>
                  <option>Enrolled</option>
                  <option>Responded/Contacted</option>
                  <option>Waiting for Response</option>
                  <option>Untouched Leads</option>
                </select>

                <select 
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  value={leadAgeFilter}
                  onChange={(e) => setLeadAgeFilter(e.target.value)}
                >
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 24 Hours</option>
                  <option>This Week</option>
                </select>

                <button className="bg-gray-700 border border-gray-600 rounded px-4 py-2 flex items-center gap-2 text-white hover:bg-gray-600">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr className="text-left text-gray-300 text-sm">
                <th className="p-4">Source</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Vehicle</th>
                <th className="p-4">Trade-in</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Progress</th>
                <th className="p-4">Communications</th>
                <th className="p-4">Programs</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center text-white font-bold text-sm">
                        {lead.source === 'Website' ? 'TC' : 'TC'}
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">{lead.name}</div>
                      <div className="text-sm text-gray-400">{lead.company}</div>
                      <div className="text-sm text-gray-500">{lead.location}</div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="flex gap-2">
                      <div className="w-12 h-8 bg-red-500 rounded"></div>
                      <div className="w-12 h-8 bg-gray-600 rounded"></div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">No Trade-in</span>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div>
                      <div className="flex items-center gap-2 text-white text-sm mb-1">
                        <Mail className="w-4 h-4" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Phone className="w-4 h-4" />
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <ProgressIndicator progress={lead.progress} />
                  </td>
                  
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={lead.status} />
                      <div className="text-sm text-gray-400">
                        <div>{lead.unread} unread</div>
                        <div>{lead.missed} missed</div>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          className="p-1 hover:bg-gray-600 rounded"
                          onClick={() => {
                            setSelectedLead(lead);
                            setActiveView('dialer');
                          }}
                        >
                          <Phone className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-600 rounded">
                          <Mail className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-1 hover:bg-gray-600 rounded">
                          <Edit className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4">
                    <div className="text-sm text-gray-400">
                      <div>Sequence</div>
                      <div>AI</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Sequences View
  const SequencesView = () => (
    <div className="p-6">
      <div className="bg-purple-600 px-6 py-3 rounded-lg mb-6">
        <div className="flex items-center gap-2 text-white">
          <Phone className="w-5 h-5" />
          <span className="font-medium">INCOMING LEADS!</span>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Sequences</h1>
            <div className="flex items-center gap-4">
              <button className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white hover:bg-gray-600">
                Options
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2 text-white flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create Sequence
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-white font-medium mb-4">Pre-built Automations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {['Welcome message', 'Send business contact card', 'Follow-up sequence'].map((template, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <h3 className="text-white font-medium mb-2">{template}</h3>
                <p className="text-gray-400 text-sm">New customer form entry</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-4">
            <select className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white">
              <option>All statuses</option>
              <option>Active</option>
              <option>Paused</option>
              <option>Draft</option>
            </select>
            <select className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white">
              <option>Select tags</option>
            </select>
            <select className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white">
              <option>Last 30 days</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr className="text-left text-gray-300 text-sm">
                  <th className="p-4">Sequence name</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Updated</th>
                  <th className="p-4">On/Off</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sequencesData.map((sequence) => (
                  <tr key={sequence.id} className="border-t border-gray-700 hover:bg-gray-700/30">
                    <td className="p-4 text-white">{sequence.name}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {sequence.type === 'email' ? (
                          <Mail className="w-4 h-4 text-blue-400" />
                        ) : (
                          <MessageSquare className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        sequence.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                        sequence.status === 'Paused' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {sequence.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">{sequence.lastUpdated}</td>
                    <td className="p-4">
                      <button className={`w-12 h-6 rounded-full relative transition-colors ${
                        sequence.status === 'Active' ? 'bg-green-600' : 'bg-gray-600'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                          sequence.status === 'Active' ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </td>
                    <td className="p-4">
                      <button className="text-gray-400 hover:text-white">
                        Edit
                      </button>
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

  // Dialer View
  const DialerView = () => (
    <div className="p-6">
      <div className="bg-purple-600 px-6 py-3 rounded-lg mb-6">
        <div className="flex items-center gap-2 text-white">
          <Phone className="w-5 h-5" />
          <span className="font-medium">INCOMING LEADS!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Queue */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h2 className="text-white font-semibold mb-4">24 Leads</h2>
          <div className="space-y-3">
            {leadsData.slice(0, 3).map((lead) => (
              <div key={lead.id} className="bg-gray-700 p-3 rounded flex items-center gap-3">
                <div className="w-12 h-8 bg-red-500 rounded"></div>
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{lead.name}</div>
                  <div className="text-gray-400 text-xs">{lead.phone}</div>
                </div>
                <div className="flex gap-1">
                  <button 
                    className="p-1 bg-green-600 hover:bg-green-700 rounded"
                    onClick={() => setIsDialerActive(true)}
                  >
                    <Phone className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lead Details */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          {selectedLead ? (
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm">Email</label>
                <div className="text-white">{selectedLead.email}</div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Phone</label>
                <div className="text-white">{selectedLead.phone}</div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Customer Info</label>
                <div className="text-white">{selectedLead.name}</div>
                <div className="text-gray-400 text-sm">{selectedLead.location}</div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Vehicle of Interest</label>
                <div className="text-white">{selectedLead.company}</div>
              </div>
              <div>
                <label className="text-gray-400 text-sm">Trade-in</label>
                <div className="text-gray-400">No Trade-in</div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400">Select a lead to view details</div>
          )}
        </div>

        {/* Call Interface */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
          {isDialerActive ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold">
                  {selectedLead ? selectedLead.name : 'Michael Thompson'}
                </h3>
                <div className="text-gray-400">
                  {selectedLead ? selectedLead.phone : '(305) 847 2156'}
                </div>
                <div className="text-green-400 text-sm mt-2">Connected - 00:45</div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
                  <button
                    key={key}
                    className="bg-gray-700 hover:bg-gray-600 p-3 rounded text-white font-medium"
                  >
                    {key}
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </button>
                <button 
                  className="w-12 h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center"
                  onClick={() => setIsDialerActive(false)}
                >
                  <Phone className="w-6 h-6 text-white" />
                </button>
                <button className="w-12 h-12 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center">
                  <Pause className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="bg-gray-700 p-3 rounded">
                <div className="text-white text-sm font-medium mb-2">Voicemail Prompt</div>
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm">
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-400">Click on a lead to start calling</div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
        <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded">
            <Phone className="w-5 h-5 text-green-400" />
            <div className="flex-1">
              <div className="text-white text-sm">Called Michael Thompson</div>
              <div className="text-gray-400 text-xs">2 minutes ago • Duration: 3:45</div>
            </div>
            <div className="text-green-400 text-sm">Completed</div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-700/50 rounded">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <div className="flex-1">
              <div className="text-white text-sm">Sent voicemail to Jessica Rodriguez</div>
              <div className="text-gray-400 text-xs">15 minutes ago</div>
            </div>
            <div className="text-blue-400 text-sm">Delivered</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Search Overlay
  const SearchOverlay = () => (
    <AnimatePresence>
      {isSearchOpen && searchTerm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-16 right-6 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Search className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300 text-sm">Search Results</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Users className="w-3 h-3" />
                <span>Leads</span>
                <span className="bg-gray-700 px-2 py-0.5 rounded">3</span>
              </div>
              
              {leadsData.filter(lead => 
                lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchTerm.toLowerCase())
              ).slice(0, 3).map((lead) => (
                <div 
                  key={lead.id} 
                  className="p-2 hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => {
                    setActiveView('leads');
                    setIsSearchOpen(false);
                  }}
                >
                  <div className="text-white text-sm">{lead.name}</div>
                  <div className="text-gray-400 text-xs">{lead.email}</div>
                </div>
              ))}
              
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
                <Workflow className="w-3 h-3" />
                <span>Sequences</span>
                <span className="bg-gray-700 px-2 py-0.5 rounded">2</span>
              </div>
              
              {sequencesData.filter(seq => 
                seq.name.toLowerCase().includes(searchTerm.toLowerCase())
              ).slice(0, 2).map((sequence) => (
                <div 
                  key={sequence.id} 
                  className="p-2 hover:bg-gray-700 rounded cursor-pointer"
                  onClick={() => {
                    setActiveView('sequences');
                    setIsSearchOpen(false);
                  }}
                >
                  <div className="text-white text-sm">{sequence.name}</div>
                  <div className="text-gray-400 text-xs">{sequence.description}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navigation />
      
      <div className="flex relative">
        <Sidebar />
        
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {activeView === 'dashboard' && <DashboardView />}
              {activeView === 'leads' && <LeadsTable />}
              {activeView === 'sequences' && <SequencesView />}
              {activeView === 'dialer' && <DialerView />}
            </motion.div>
          </AnimatePresence>
          
          <SearchOverlay />
        </div>
      </div>
    </div>
  );
};

export default CRMSystem;
