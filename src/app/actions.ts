"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export type BookingStatus = "pending" | "completed" | "delivered";
export type BookingSource = "customer" | "admin";

export interface BookingData {
  id?: string;
  name: string;
  phone: string;
  event_date: string;
  package: string;
  requirements: string;
  amount?: number;
  discount?: number;
  source?: BookingSource;
  status?: BookingStatus;
}

export async function createBooking(data: BookingData) {
  try {
    const { error } = await supabase.from("bookings").insert([
      {
        ...data,
        source: data.source || "customer",
        status: data.status || "pending",
      },
    ]);

    if (error) throw new Error(error.message);

    revalidatePath("/admiiin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getBookings() {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  try {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/admiiin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateBookingDetails(id: string, details: Partial<BookingData>) {
  try {
    const { error } = await supabase
      .from("bookings")
      .update(details)
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/admiiin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteBooking(id: string) {
  try {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);

    revalidatePath("/admiiin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getGallery() {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}

export async function getVideos() {
  try {
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message, data: [] };
  }
}
