"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUserSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { useRouter } from "next/navigation";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { USER_ROLES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { updateUser } from "@/lib/actions/user.actions";

const UpdateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const route = useRouter()

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user
  })
  const onSubmit  = async (values: z.infer<typeof  updateUserSchema>) => {
    try {
      const res = await updateUser({
        ...values,
        id: user.id
      });

      if(!res.success) {
        return toast.error(res.message)
      } 
      toast.success(res.message)

      form.reset();
      route.push('/admin/users')
    } catch (error) {
      toast.error( (error as Error).message )
    }
  }
  return <Form {...form}>
    <form method='POST' onSubmit={form.handleSubmit(onSubmit)}>
      {/* Email */}
      <div>
      <FormField
        control={form.control}
        name='email'
        render={({field}: {field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'email'>}) => (
          <FormItem className="w-full flex flex-col items-start" >
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input disabled={true} placeholder='Enter user Email' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      {/* Name */}
      <div>
      <FormField
        control={form.control}
        name='name'
        render={({field}: {field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'name'>}) => (
          <FormItem className="w-full flex flex-col items-start  mt-4" >
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input  placeholder='Enter user Name' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      </div>
      {/* Role */}
      <div>
      <FormField
        control={form.control}
        name='role'
        render={({field}: {field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'role'>}) => (
          <FormItem className='w-full  mt-4'>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger  className="w-full">
                      <SelectValue placeholder='Select a role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {USER_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
        )}
      />
      </div>
      <div className="flex-between">
        <Button type='submit' className="w-full mt-4" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Submitting...' : 'Update User'}
        </Button>
      </div>
    </form>
  </Form>
};

export default UpdateUserForm;
