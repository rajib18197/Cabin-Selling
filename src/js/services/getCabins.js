import { supabase } from "./supabase";

export async function getCabins() {
  const { data: luxuryCabins, error } = await supabase
    .from("luxuryCabins")
    .select("*");

  if (error) {
    throw new Error("Error");
  }

  return luxuryCabins;
}

export async function getCabin(id) {
  const { data: luxuryCabin, error } = await supabase
    .from("luxuryCabins")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Error");
  }

  return luxuryCabin;
}

export async function bookNewCabin(...cabin) {
  const { data, error } = await supabase
    .from("orderedCabins")
    .insert([...cabin])
    .select();

  if (error) {
    throw new Error("Error");
  }

  console.log(data);
  return data;
}

export async function getOrderedCabin(id) {
  const { data, error } = await supabase
    .from("orderedCabins")
    .select("*, luxuryCabins(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Error");
  }

  console.log(data);
  return data;
}
