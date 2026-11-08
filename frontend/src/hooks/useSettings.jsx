import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "../services/settingService";

export default function useSettings() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState(null);

  // Get Settings
  const { data, isLoading, isError } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  // Initialize form with API data
  useEffect(() => {
    if (data) {
      setFormData(data.data ?? data);
    }
  }, [data]);

  // Handle normal fields
  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Handle nested fields
  const handleNestedChange = (section, parent, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parent]: {
          ...prev[section][parent],
          [field]: value,
        },
      },
    }));
  };

  // Update Settings
  const { mutate, isPending } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });

  const handleSubmit = () => {
    if (!formData) return;
    mutate(formData);
  };

  return {
    formData,
    isLoading,
    isError,
    isPending,
    handleChange,
    handleNestedChange,
    handleSubmit,
  };
}
