import { Autocomplete, TextField } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { Controller, type UseFormReturn } from "react-hook-form"
import type { ChallengeInfos } from "../../types/challenge"
import { fetchGameTitles } from "../../utils/gameTitles"

type ChallengeFormProps = {
  form: UseFormReturn<ChallengeInfos>
}

export const ChallengeForm = ({ form }: ChallengeFormProps) => {
  const {
    register,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form

  const { data: gameOptions = [] } = useQuery({
    queryKey: ["gameOptions"],
    queryFn: fetchGameTitles,
  })
  return (
    <>
      <TextField
        label="Titre du challenge"
        type="text"
        fullWidth
        margin="normal"
        {...register("title", {
          required: "champ requis",
          maxLength: { value: 100, message: "Maximum 100 caractères" },
        })}
        error={!!errors.title}
        helperText={errors.title?.message}
        sx={{
          marginBottom: 2,
        }}
        multiline
        rows={1}
        variant="outlined"
      />
      <TextField
        label="Description"
        type="text"
        fullWidth
        margin="normal"
        {...register("description", {
          required: "champ requis",
          maxLength: { value: 100, message: "Maximum 100 caractères" },
          minLength: { value: 10, message: "Minimum 10 caractères" },
        })}
        sx={{
          marginBottom: 2,
        }}
        name="description"
        multiline
        rows={1}
        variant="outlined"
        onChange={(e) => {
          setValue("description", e.target.value)
          trigger("description")
        }}
        error={!!errors.description}
        helperText={
          errors.description?.message ||
          `${watch("description")?.length || 0}/200 caractères`
        }
      />
      <TextField
        label="Règles"
        type="text"
        fullWidth
        margin="normal"
        {...register("rules", {
          required: "champ requis",
          maxLength: { value: 100, message: "Maximum 100 caractères" },
          minLength: { value: 10, message: "Minimum 10 caractères" },
        })}
        multiline
        rows={1}
        variant="outlined"
        value={watch("rules") || ""}
        onChange={(e) => {
          setValue("rules", e.target.value)
          trigger("rules")
        }}
        error={!!errors.rules}
        helperText={
          errors.rules?.message ||
          `${watch("rules")?.length || 0}/200 caractères`
        }
      />
      <Controller
        name="game_title"
        control={control}
        rules={{ required: "champ requis" }}
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={gameOptions}
            getOptionLabel={(option) => option}
            value={field.value}
            onChange={(_, value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Titre du jeu"
                type="text"
                fullWidth
                margin="normal"
              />
            )}
          />
        )}
      />
    </>
  )
}
