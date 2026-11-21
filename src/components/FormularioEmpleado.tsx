import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { DatosNuevoEmpleado } from '@/types';
import { empleadoSchema, type EmpleadoValores } from '@/utils/schemas';
import { validarImagen } from '@/utils/validarImagen';

interface FormularioEmpleadoProps {
  guardando: boolean;
  onGuardar: (datos: DatosNuevoEmpleado) => void;
  onCancelar: () => void;
}

export default function FormularioEmpleado({
  guardando,
  onGuardar,
  onCancelar,
}: FormularioEmpleadoProps) {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [errorArchivo, setErrorArchivo] = useState<string | null>(null);
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmpleadoValores>({
    resolver: zodResolver(empleadoSchema),
    defaultValues: { firstName: '', lastName: '', email: '', age: '' },
  });

  useEffect(() => {
    return () => {
      if (vistaPrevia) {
        URL.revokeObjectURL(vistaPrevia);
      }
    };
  }, [vistaPrevia]);

  const elegirArchivo = (evento: ChangeEvent<HTMLInputElement>) => {
    const elegido = evento.target.files?.[0];

    if (!elegido) {
      setArchivo(null);
      setErrorArchivo(null);
      setVistaPrevia(null);
      return;
    }

    const mensaje = validarImagen(elegido);

    if (mensaje) {
      setArchivo(null);
      setErrorArchivo(mensaje);
      setVistaPrevia(null);
      return;
    }

    setArchivo(elegido);
    setErrorArchivo(null);
    setVistaPrevia(URL.createObjectURL(elegido));
  };

  const enviar = handleSubmit((valores) => {
    if (errorArchivo) {
      return;
    }
    onGuardar({
      firstName: valores.firstName,
      lastName: valores.lastName,
      email: valores.email,
      age: Number(valores.age),
      image: archivo,
    });
  });

  return (
    <form onSubmit={enviar} noValidate className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">Nombre</Label>
        <Input
          id="firstName"
          aria-invalid={Boolean(errors.firstName)}
          {...register('firstName')}
        />
        {errors.firstName && (
          <p className="text-sm text-destructive">{errors.firstName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Apellido</Label>
        <Input
          id="lastName"
          aria-invalid={Boolean(errors.lastName)}
          {...register('lastName')}
        />
        {errors.lastName && (
          <p className="text-sm text-destructive">{errors.lastName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo</Label>
        <Input
          id="email"
          type="email"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Edad</Label>
        <Input
          id="age"
          type="number"
          inputMode="numeric"
          aria-invalid={Boolean(errors.age)}
          {...register('age')}
        />
        {errors.age && (
          <p className="text-sm text-destructive">{errors.age.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Fotografía (JPG o PNG, máx. 1 MB)</Label>
        <Input
          id="image"
          type="file"
          accept="image/jpeg,image/png"
          onChange={elegirArchivo}
        />
        {errorArchivo && (
          <p className="text-sm text-destructive">{errorArchivo}</p>
        )}
        {vistaPrevia && (
          <img
            src={vistaPrevia}
            alt="Vista previa de la fotografía"
            className="size-24 rounded-md object-cover"
          />
        )}
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          disabled={guardando}
          onClick={onCancelar}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={guardando}>
          Guardar
        </Button>
      </DialogFooter>
    </form>
  );
}