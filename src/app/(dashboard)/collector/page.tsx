"use client"

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Truck, CheckCircle2, Clock, MapPin, 
  Camera, Phone, User, AlertTriangle,
  FileCheck2, Navigation, ExternalLink,
  Compass, ArrowRight, Sparkles, Check,
  RotateCcw, ShieldAlert, X, UploadCloud, AlertCircle
} from "lucide-react"

export interface PickupTask {
  id: string
  sequence: number
  location: string
  landmark: string
  wasteType: string
  wasteColor: string
  time: string
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  requirement: string
  contactName: string
  contactPhone: string
  notes: string
  distance: string
  eta: string
  coordinates: { lat: number; lng: number }
  status: 'completed' | 'in-progress' | 'pending'
  proofPhoto?: string
}

const initialTasks: PickupTask[] = [
  {
    id: '1',
    sequence: 1,
    location: 'Near Infinity Mall, Andheri W',
    landmark: 'Link Road Junction, Opp. Food Court',
    wasteType: 'Organic',
    wasteColor: 'bg-green-100 text-green-700',
    time: '08:00 AM',
    priority: 'Low',
    requirement: 'Morning market vegetable waste bins',
    contactName: 'Ramesh Chawla',
    contactPhone: '+91 98201 12345',
    notes: 'Regular scheduled morning pickup completed.',
    distance: '0.8 km',
    eta: 'Completed',
    coordinates: { lat: 19.1415, lng: 72.8315 },
    status: 'completed',
    proofPhoto: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80'
  },
  {
    id: '2',
    sequence: 2,
    location: 'Carter Road, Bandra W',
    landmark: 'Promenade near Cafe Coffee Day',
    wasteType: 'Recyclable',
    wasteColor: 'bg-blue-100 text-blue-700',
    time: '08:45 AM',
    priority: 'Medium',
    requirement: 'Promenade plastic bottle recycling bins',
    contactName: 'Sunita Rao',
    contactPhone: '+91 98192 23456',
    notes: 'Cleared ocean-facing pedestrian bins.',
    distance: '1.2 km',
    eta: 'Completed',
    coordinates: { lat: 19.0657, lng: 72.8234 },
    status: 'completed',
    proofPhoto: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=400&q=80'
  },
  {
    id: '3',
    sequence: 3,
    location: 'Juhu Beach Promenade',
    landmark: 'Near Shivaji Statue Entrance',
    wasteType: 'Mixed',
    wasteColor: 'bg-orange-100 text-orange-700',
    time: '09:30 AM',
    priority: 'High',
    requirement: 'Weekend tourist food packaging overflow',
    contactName: 'Anil Deshmukh',
    contactPhone: '+91 98330 34567',
    notes: 'Cleared 4 large community bins.',
    distance: '2.1 km',
    eta: 'Completed',
    coordinates: { lat: 19.0988, lng: 72.8268 },
    status: 'completed',
    proofPhoto: 'https://images.unsplash.com/photo-1528323273322-d81458248d40?w=400&q=80'
  },
  {
    id: '5',
    sequence: 4,
    location: 'Link Road, Malad W',
    landmark: 'Near Inorbit Signal & Metro Pillar 84',
    wasteType: 'E-Waste',
    wasteColor: 'bg-purple-100 text-purple-700',
    time: '11:15 AM',
    priority: 'Critical',
    requirement: 'Urgent bio-chemical & lithium batteries dumped near public storm drain - water risk',
    contactName: 'Kunal Verma',
    contactPhone: '+91 98700 88990',
    notes: 'CRITICAL REQUIREMENT: Clear immediately to avoid drainage blockage and toxic contamination.',
    distance: '1.4 km',
    eta: '5 mins',
    coordinates: { lat: 19.1865, lng: 72.8354 },
    status: 'pending'
  },
  {
    id: '4',
    sequence: 5,
    location: 'SV Road, Near Filmcity, Goregaon West',
    landmark: 'Opp. Goregaon Bus Depot, Signal 4',
    wasteType: 'Mixed Waste',
    wasteColor: 'bg-orange-100 text-orange-700',
    time: '10:30 AM',
    priority: 'High',
    requirement: 'Large commercial heap spilling into active traffic bus lane',
    contactName: 'Priya Mehta',
    contactPhone: '+91 98201 44520',
    notes: 'Large pile near the bus stop, needs 2 crew members.',
    distance: '2.4 km',
    eta: '8 mins',
    coordinates: { lat: 19.1663, lng: 72.8365 },
    status: 'in-progress'
  },
  {
    id: '9',
    sequence: 6,
    location: 'Borivali National Park Gate',
    landmark: 'Western Express Highway Exit, Gate 1',
    wasteType: 'Organic',
    wasteColor: 'bg-green-100 text-green-700',
    time: '03:00 PM',
    priority: 'High',
    requirement: 'High volume organic food waste at forest boundary - animal attraction hazard',
    contactName: 'Sanjay Gokhale',
    contactPhone: '+91 98450 67890',
    notes: 'Forest edge buffer zone, prevent wildlife scavenging.',
    distance: '4.8 km',
    eta: '14 mins',
    coordinates: { lat: 19.2274, lng: 72.8601 },
    status: 'pending'
  },
  {
    id: '6',
    sequence: 7,
    location: 'Lokhandwala Complex, Andheri W',
    landmark: 'Back Road Market, Near Celebration Club',
    wasteType: 'Organic',
    wasteColor: 'bg-green-100 text-green-700',
    time: '12:00 PM',
    priority: 'Medium',
    requirement: 'Society compost bin overflow & heavy garden trimmings',
    contactName: 'Farhan Akhtar',
    contactPhone: '+91 98111 22334',
    notes: 'Green waste truck compactor needed.',
    distance: '3.1 km',
    eta: '10 mins',
    coordinates: { lat: 19.1432, lng: 72.8251 },
    status: 'pending'
  },
  {
    id: '8',
    sequence: 8,
    location: 'Mindspace, Malad W',
    landmark: 'Building 4 Service Gate, Behind Hypercity',
    wasteType: 'Mixed',
    wasteColor: 'bg-orange-100 text-orange-700',
    time: '02:00 PM',
    priority: 'Medium',
    requirement: 'Commercial tech park cardboard & cafeteria packaging',
    contactName: 'Sneha Kapadia',
    contactPhone: '+91 98333 44556',
    notes: 'Security gate clearance pass pre-approved.',
    distance: '3.6 km',
    eta: '11 mins',
    coordinates: { lat: 19.1765, lng: 72.8378 },
    status: 'pending'
  },
  {
    id: '7',
    sequence: 9,
    location: 'Versova Metro Station',
    landmark: 'Under Pier 14, Station Gate 2',
    wasteType: 'Recyclable',
    wasteColor: 'bg-blue-100 text-blue-700',
    time: '01:00 PM',
    priority: 'Low',
    requirement: 'Commuter paper cups & dry trash bins',
    contactName: 'Vikram Shinde',
    contactPhone: '+91 98222 33445',
    notes: 'Standard scheduled clearance.',
    distance: '4.2 km',
    eta: '12 mins',
    coordinates: { lat: 19.1311, lng: 72.8210 },
    status: 'pending'
  },
  {
    id: '10',
    sequence: 10,
    location: 'Kandivali Station Road',
    landmark: 'West Exit, Near Bus Depot',
    wasteType: 'Recyclable',
    wasteColor: 'bg-blue-100 text-blue-700',
    time: '04:00 PM',
    priority: 'Low',
    requirement: 'Station pedestrian litter collection',
    contactName: 'Deepak More',
    contactPhone: '+91 98666 77889',
    notes: 'End-of-shift regular route clearance.',
    distance: '5.5 km',
    eta: '16 mins',
    coordinates: { lat: 19.2062, lng: 72.8526 },
    status: 'pending'
  },
]

const priorityWeights: Record<PickupTask['priority'], number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1
}

const priorityBadges: Record<PickupTask['priority'], { bg: string; text: string; border: string }> = {
  Critical: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  High: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  Medium: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  Low: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' }
}

export default function CollectorDashboard() {
  const [tasks, setTasks] = useState<PickupTask[]>(initialTasks)
  const [activeTaskId, setActiveTaskId] = useState<string>('4')
  const [isNavigating, setIsNavigating] = useState<boolean>(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isProofModalOpen, setIsProofModalOpen] = useState(false)
  const [proofImagePreview, setProofImagePreview] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 4500)
  }

  // Active task object
  const activeTask = useMemo(() => {
    return tasks.find(t => t.id === activeTaskId) || tasks.find(t => t.status === 'in-progress') || tasks[0]
  }, [tasks, activeTaskId])

  // Priority-based sorting function
  const prioritizeRoute = (currentTasks: PickupTask[]): { sorted: PickupTask[]; firstPendingId: string | null } => {
    const completed = currentTasks.filter(t => t.status === 'completed')
    const uncompleted = currentTasks.filter(t => t.status !== 'completed')

    // Sort uncompleted by priority weight (Critical first, then High, then Medium, Low)
    uncompleted.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority])

    // Re-assign sequence numbers
    const combined = [...completed, ...uncompleted]
    const resequenced = combined.map((task, idx) => ({
      ...task,
      sequence: idx + 1
    }))

    const firstPending = uncompleted.length > 0 ? uncompleted[0].id : null
    return { sorted: resequenced, firstPendingId: firstPending }
  }

  // Handle "Start Navigation" button: No alert popup! Directly start navigation by priority!
  const handleStartNavigation = () => {
    const { sorted, firstPendingId } = prioritizeRoute(tasks)
    
    if (!firstPendingId) {
      showToast("All assigned route pickups have already been completed for today!")
      return
    }

    // Set first priority task as in-progress and mark previous in-progress as pending if different
    const updatedTasks = sorted.map(t => {
      if (t.id === firstPendingId) {
        return { ...t, status: 'in-progress' as const }
      } else if (t.status === 'in-progress' && t.id !== firstPendingId) {
        return { ...t, status: 'pending' as const }
      }
      return t
    })

    setTasks(updatedTasks)
    setActiveTaskId(firstPendingId)
    setIsNavigating(true)

    const targetStop = updatedTasks.find(t => t.id === firstPendingId)
    if (targetStop) {
      showToast(`🛰️ GPS Navigation directly started! Route sorted by Priority & Requirements. First stop: ${targetStop.location} (${targetStop.priority} Priority).`)
      
      // Directly launch Google Maps navigation with optimal destination
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(targetStop.location + ', Mumbai, Maharashtra')}`
      window.open(mapsUrl, '_blank')
    }
  }

  // Open Google Maps for current active destination
  const handleOpenGoogleMaps = (location: string) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location + ', Mumbai, Maharashtra')}`
    window.open(mapsUrl, '_blank')
  }

  // Mark task status
  const markTaskStatus = (id: string, newStatus: PickupTask['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
  }

  // Complete active task and automatically route to next prioritized stop
  const handleActiveTaskComplete = () => {
    const completedTaskId = activeTask.id
    
    // Mark current completed
    const updatedTasks = tasks.map(t => t.id === completedTaskId ? { ...t, status: 'completed' as const } : t)
    
    // Find next uncompleted stop based on highest priority
    const uncompleted = updatedTasks.filter(t => t.status !== 'completed')
    uncompleted.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority])
    
    if (uncompleted.length > 0) {
      const nextTask = uncompleted[0]
      const finalTasks = updatedTasks.map(t => t.id === nextTask.id ? { ...t, status: 'in-progress' as const } : t)
      setTasks(finalTasks)
      setActiveTaskId(nextTask.id)
      showToast(`✓ Completed pickup at ${activeTask.location}! Automatically routing to next priority stop: ${nextTask.location} (${nextTask.priority} Priority).`)
    } else {
      setTasks(updatedTasks)
      setIsNavigating(false)
      showToast(`🎉 Excellent work! All assigned collections for today are completed!`)
    }
  }

  // Select task from list to inspect or navigate to
  const handleSelectTask = (task: PickupTask) => {
    setActiveTaskId(task.id)
    if (task.status === 'pending') {
      // Promptly switch active
      setTasks(prev => prev.map(t => {
        if (t.id === task.id) return { ...t, status: 'in-progress' }
        if (t.status === 'in-progress') return { ...t, status: 'pending' }
        return t
      }))
    }
  }

  // Complete proof upload
  const handleConfirmProofUpload = () => {
    setTasks(prev => prev.map(t => t.id === activeTask.id ? { 
      ...t, 
      proofPhoto: proofImagePreview || 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80' 
    } : t))
    setIsProofModalOpen(false)
    setProofImagePreview(null)
    showToast(`✓ Disposal proof photo verified with GPS geotag: ${activeTask.coordinates.lat.toFixed(4)}° N, ${activeTask.coordinates.lng.toFixed(4)}° E`)
  }

  const completedCount = tasks.filter(t => t.status === 'completed').length
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length
  const criticalCount = tasks.filter(t => t.priority === 'Critical' && t.status !== 'completed').length

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 max-w-md bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-top-4 flex items-start gap-3">
          <div className="p-1 bg-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
            <Compass className="w-5 h-5 animate-spin" />
          </div>
          <div className="flex-1 text-sm leading-relaxed">{toastMessage}</div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Collector Dashboard</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Fleet MH-02-AB-1234
            </span>
          </div>
          <p className="text-slate-500 mt-1">
            Real-time municipal route optimization • Western Suburbs Zone A (Bandra to Dahisar)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {criticalCount > 0 && (
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-semibold">
              <ShieldAlert className="w-4 h-4 text-red-600 animate-pulse" />
              {criticalCount} Critical Priority Stop
            </span>
          )}

          <Button 
            onClick={handleStartNavigation}
            className={`font-semibold shadow-md transition-all ${
              isNavigating 
                ? "bg-amber-600 hover:bg-amber-700 text-white" 
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            <Navigation className={`w-4 h-4 mr-2 ${isNavigating ? "animate-pulse" : ""}`} /> 
            {isNavigating ? "Restart Prioritized Route" : "Start Navigation (Priority-First)"}
          </Button>
        </div>
      </div>

      {/* Live GPS Navigation HUD Banner */}
      {isNavigating && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-5 rounded-2xl shadow-xl border border-emerald-500/30 animate-in fade-in slide-in-from-top-3">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Navigation className="w-6 h-6 text-emerald-400 animate-bounce" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Live GPS Turn-by-Turn Navigation Active
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-bold rounded-md ${priorityBadges[activeTask.priority].bg} ${priorityBadges[activeTask.priority].text}`}>
                    Stop #{activeTask.sequence}: {activeTask.priority} Priority First
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {activeTask.location}
                </h3>
                <p className="text-xs text-slate-300 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Turn-by-turn guidance: In 350m, take the Western Express Highway ramp towards {activeTask.landmark}.</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:self-center border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-700">
              <div className="text-right pr-4 hidden sm:block">
                <p className="text-xs text-slate-400">Est. Distance / ETA</p>
                <p className="text-lg font-bold text-emerald-400">{activeTask.distance} • {activeTask.eta}</p>
              </div>

              <Button
                size="sm"
                onClick={() => handleOpenGoogleMaps(activeTask.location)}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                Open Google Maps App
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleActiveTaskComplete}
                className="border-slate-600 text-slate-200 hover:bg-slate-800 text-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
                Done & Next Stop
              </Button>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsNavigating(false)}
                className="text-slate-400 hover:text-white hover:bg-slate-800 text-xs"
              >
                <X className="w-3.5 h-3.5 mr-1" />
                Exit Nav
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Assigned Today</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-1">{tasks.length} pickups</h3>
              <p className="text-xs text-slate-500 mt-0.5">Mumbai Western Suburbs</p>
            </div>
            <div className="p-3 bg-slate-100 rounded-2xl text-slate-600">
              <MapPin className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Completed</p>
              <h3 className="text-2xl font-bold text-emerald-600 mt-1">{completedCount} pickups</h3>
              <p className="text-xs text-emerald-600 mt-0.5">Verified with photo proof</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">In Progress</p>
              <h3 className="text-2xl font-bold text-blue-600 mt-1">{inProgressCount} pickup</h3>
              <p className="text-xs text-blue-600 mt-0.5">Priority stop assigned</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
              <Truck className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Route Efficiency</p>
              <h3 className="text-2xl font-bold text-purple-600 mt-1">
                {Math.round((completedCount / tasks.length) * 100)}%
              </h3>
              <p className="text-xs text-purple-600 mt-0.5">Priority optimized route</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
              <Clock className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Dynamic Active Pickup Card */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="border-emerald-300 shadow-md overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span>Current Active Stop #{activeTask.sequence}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${priorityBadges[activeTask.priority].bg} ${priorityBadges[activeTask.priority].text} ${priorityBadges[activeTask.priority].border}`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {activeTask.priority} Priority
                </span>
              </div>
              <CardTitle className="text-xl font-bold text-slate-900 leading-snug">
                {activeTask.location}
              </CardTitle>
              <p className="text-xs text-slate-600 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {activeTask.landmark}
              </p>
            </CardHeader>

            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium block mb-1">Waste Category</span>
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${activeTask.wasteColor}`}>
                    {activeTask.wasteType}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium block mb-1">Distance & ETA</span>
                  <span className="font-bold text-slate-800 text-sm">
                    {activeTask.distance} • {activeTask.eta}
                  </span>
                </div>
              </div>

              {/* Requirement Alert Callout */}
              <div className="p-3.5 bg-amber-50 rounded-xl text-xs text-amber-900 border border-amber-200/80 leading-relaxed">
                <strong className="font-bold flex items-center gap-1 text-amber-800 mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600" /> Urgent Requirement:
                </strong>
                {activeTask.requirement}
              </div>

              {/* Requester Contact */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-700">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-slate-400" />
                    <span className="font-semibold">{activeTask.contactName}</span>
                  </div>
                  <a 
                    href={`tel:${activeTask.contactPhone}`}
                    className="flex items-center font-bold text-emerald-700 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 mr-1" />
                    {activeTask.contactPhone}
                  </a>
                </div>
                <div className="text-[11px] text-slate-500">
                  <strong>Notes:</strong> &ldquo;{activeTask.notes}&rdquo;
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div>
                <label className="text-xs font-bold text-slate-700 mb-1.5 block uppercase tracking-wider">
                  Update Task Status
                </label>
                <select 
                  value={activeTask.status}
                  onChange={(e) => {
                    const val = e.target.value as PickupTask['status']
                    markTaskStatus(activeTask.id, val)
                  }}
                  className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="in-progress">In Progress (Active Navigation)</option>
                  <option value="completed">Completed (Proof Uploaded)</option>
                  <option value="pending">Pending (Queued)</option>
                </select>
              </div>

              {/* Proof Photo Preview if exists */}
              {activeTask.proofPhoto && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="font-medium">Proof verified with GPS coordinates</span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">
                    {activeTask.coordinates.lat.toFixed(3)}N, {activeTask.coordinates.lng.toFixed(3)}E
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 pt-2">
                <Button 
                  onClick={handleActiveTaskComplete}
                  disabled={activeTask.status === 'completed'}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" /> 
                  {activeTask.status === 'completed' ? 'Completed ✓' : 'Mark Complete & Route Next'}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => handleOpenGoogleMaps(activeTask.location)}
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5 mr-1 text-blue-600" /> 
                    Google Maps
                  </Button>

                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => setIsProofModalOpen(true)}
                    className={`border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-xs ${
                      activeTask.proofPhoto ? "bg-blue-50" : ""
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5 mr-1" /> 
                    {activeTask.proofPhoto ? "Proof Saved ✓" : "Upload Photo"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Route Section */}
        <div className="lg:col-span-7">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 flex flex-row items-center justify-between py-4">
              <div>
                <CardTitle className="text-xl font-bold flex items-center text-slate-900">
                  <MapPin className="w-5 h-5 mr-2 text-emerald-600" /> Today&apos;s Prioritized Route
                </CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ordered by incident priority (Critical &rarr; High &rarr; Medium &rarr; Low)
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const { sorted } = prioritizeRoute(tasks)
                  setTasks(sorted)
                  showToast("Route sequence re-optimized by priority & requirement urgency!")
                }}
                className="text-xs font-semibold text-emerald-700 border-emerald-200 hover:bg-emerald-50"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Sort by Priority
              </Button>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y divide-slate-100 max-h-[640px] overflow-y-auto">
                {tasks.map((task) => {
                  const isCompleted = task.status === 'completed'
                  const isInProgress = task.status === 'in-progress'
                  const isCurrentActive = task.id === activeTask.id

                  return (
                    <div 
                      key={task.id} 
                      onClick={() => handleSelectTask(task)}
                      className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors cursor-pointer ${
                        isCurrentActive 
                          ? 'bg-emerald-50/70 border-l-4 border-l-emerald-600' 
                          : isCompleted 
                            ? 'bg-slate-50/50 opacity-75 hover:bg-slate-50' 
                            : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3.5 flex-1">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs shrink-0 mt-0.5 ${
                          isCompleted ? 'bg-slate-200 text-slate-500' : 
                          isInProgress ? 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2' : 
                          task.priority === 'Critical' ? 'bg-red-600 text-white' :
                          task.priority === 'High' ? 'bg-amber-500 text-white' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {task.sequence}
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className={`font-bold text-sm text-slate-900 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
                              {task.location}
                            </p>
                            
                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${priorityBadges[task.priority].bg} ${priorityBadges[task.priority].text} ${priorityBadges[task.priority].border}`}>
                              {task.priority}
                            </span>
                            
                            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${task.wasteColor}`}>
                              {task.wasteType}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 leading-snug">
                            {task.requirement}
                          </p>

                          <div className="flex items-center space-x-3 text-xs text-slate-400 font-medium">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1 text-slate-400" /> {task.time}
                            </span>
                            <span>•</span>
                            <span className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1 text-slate-400" /> {task.distance} ({task.eta})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end space-x-2 shrink-0 sm:pl-2">
                        {isCompleted && (
                          <div className="flex flex-col items-end mr-2">
                            <span className="flex items-center text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                            </span>
                            <span className="flex items-center text-[10px] text-slate-400 mt-0.5">
                              <FileCheck2 className="w-3 h-3 mr-1 text-emerald-600" /> Geotagged
                            </span>
                          </div>
                        )}
                        
                        {isInProgress && (
                          <div className="flex items-center gap-2">
                            <span className="flex items-center text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
                              <Truck className="w-3 h-3 mr-1 animate-pulse" /> Active Stop
                            </span>
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation()
                                markTaskStatus(task.id, 'completed')
                                showToast(`Marked ${task.location} completed!`)
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7 px-2.5"
                            >
                              Done
                            </Button>
                          </div>
                        )}

                        {task.status === 'pending' && (
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleOpenGoogleMaps(task.location)
                              }}
                              className="text-xs h-7 px-2 text-slate-600 hover:text-emerald-700 border-slate-200"
                              title="Navigate in Google Maps"
                            >
                              <Navigation className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              onClick={(e) => {
                                e.stopPropagation()
                                markTaskStatus(task.id, 'completed')
                                showToast(`Marked ${task.location} completed!`)
                              }}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-7 px-2.5"
                            >
                              Done
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Proof Photo Geotag Verification Modal */}
      {isProofModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-emerald-600" />
                  Proof Photo Geotag Verification
                </h3>
                <p className="text-xs text-slate-500">Capture or attach photo for: {activeTask.location}</p>
              </div>
              <button onClick={() => setIsProofModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors">
                {proofImagePreview ? (
                  <div className="relative rounded-lg overflow-hidden max-h-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={proofImagePreview} alt="Proof preview" className="w-full h-48 object-cover rounded-lg" />
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-[10px] font-mono">
                      GPS: {activeTask.coordinates.lat.toFixed(4)}° N, {activeTask.coordinates.lng.toFixed(4)}° E
                    </div>
                  </div>
                ) : (
                  <div>
                    <UploadCloud className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-800">Upload waste disposal confirmation photo</p>
                    <p className="text-xs text-slate-500 mt-1">Automatic EXIF GPS timestamp will be verified by BMC servers</p>
                    <div className="mt-3 flex justify-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => setProofImagePreview('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                      >
                        <Camera className="w-3.5 h-3.5 mr-1" /> Use Device Camera
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-600">
                <div className="flex justify-between">
                  <span>Target Area:</span>
                  <span className="font-semibold text-slate-800">{activeTask.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>GPS Geotag:</span>
                  <span className="font-mono text-emerald-700 font-semibold">
                    {activeTask.coordinates.lat.toFixed(4)}° N, {activeTask.coordinates.lng.toFixed(4)}° E (±4m)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Timestamp:</span>
                  <span className="font-semibold text-slate-800">Today {activeTask.time} IST</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
              <Button variant="outline" onClick={() => setIsProofModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmProofUpload}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Check className="w-4 h-4 mr-1" /> Confirm & Verify Proof
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
