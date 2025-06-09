"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Users, Mail, Calendar, MessageSquare } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type GuestEntry = {
  timestamp: string
  name: string
  email: string
  guests: string
  message: string
}

export default function BookOfGuests() {
  const [guests, setGuests] = useState<GuestEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalGuests, setTotalGuests] = useState(0)

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwGW0SqAlA6Jo3i0MeedOd3BEDTtPXPvb07-j2VmU8k4QMokEerhvMHGn-SYOUgGl1v/exec',
        { cache: 'no-store' }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch guest list')
      }

      const data = await response.json()
      
      if (!data || !data.GoogleSheetData) {
        setGuests([])
        setTotalGuests(0)
        return
      }

      const rows: string[][] = data.GoogleSheetData
      if (!Array.isArray(rows) || rows.length <= 1) {
        setGuests([])
        setTotalGuests(0)
        return
      }

      const header = rows[0]
      const entries = rows.slice(1)

      const guestEntries: GuestEntry[] = entries.map((row) => {
        const rowObj: Record<string, string> = {}
        header.forEach((col, i) => {
          rowObj[col] = row[i] || ""
        })
        return {
          timestamp: rowObj["Timestamp"] || new Date().toISOString(),
          name: rowObj["Full Name"] || "Guest",
          email: rowObj["Email"] || "",
          guests: rowObj["Number Of Guests"] || "1",
          message: rowObj["Message"] || ""
        }
      })

      setGuests(guestEntries)
      setTotalGuests(guestEntries.reduce((sum, entry) => sum + parseInt(entry.guests), 0))
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="border-2 border-[#D4AF37] shadow-xl glass-card">
        <CardHeader className="text-center">
          <CardTitle className="great-vibes-regular text-3xl md:text-4xl text-[#B91C1C] mb-2">Book of Guests</CardTitle>
          <div className="flex items-center justify-center gap-2 text-[#B8860B]">
            <Users className="h-5 w-5" />
            <span className="playfair-display text-lg">Total Guests: {totalGuests}</span>
          </div>
        </CardHeader>
        <CardContent className="p-4 md:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[#B91C1C]" />
                <span className="text-[#B91C1C] font-medium">Loading guests...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-40 text-[#B91C1C]">
              <div className="flex flex-col items-center gap-3">
                <span>{error}</span>
              </div>
            </div>
          ) : guests.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-[#B91C1C]">
              <div className="flex flex-col items-center gap-3">
                <MessageSquare className="h-8 w-8" />
                <span>No guests have RSVP'd yet</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {guests.map((guest, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    index % 2 === 0 ? "bg-[#FFFDD0]/30" : "bg-white"
                  } border border-[#D4AF37]/20`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-[#B91C1C] text-lg flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {guest.name}
                      </h4>
                      <div className="flex items-center text-sm text-[#B8860B] mt-1">
                        <Mail className="h-4 w-4 mr-1" />
                        <span>{guest.email}</span>
                      </div>
                    </div>
                    <Badge className="bg-[#D4AF37]/20 text-[#B91C1C] border-none font-semibold px-3 py-1 rounded-full">
                      {guest.guests} {parseInt(guest.guests) === 1 ? "Guest" : "Guests"}
                    </Badge>
                  </div>

                  {guest.message && (
                    <div className="mt-3 pt-3 border-t border-[#D4AF37]/20">
                      <div className="flex items-start">
                        <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-[#B91C1C]/30" />
                        <p className="text-sm text-[#B91C1C]/80">{guest.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-3 text-xs text-[#B91C1C]/40 flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    <span>RSVP'd on {formatDate(guest.timestamp)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 