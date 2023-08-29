<template>
    <div>
        <div @click="toggleSwitch" class="w-[44px] h-6 shadow-md p-[2px] rounded-full bg-white cursor-pointer">
            <div :class="modelValue ? 'translate-x-0' : 'translate-x-5'" class="w-[21px] h-[21px] rounded-full bg-slate-800 flex items-center justify-center transition-all duration-300">
                <ClientOnly>
                    <Icon v-if="colorMode.preference == 'dark'" size="24" name="uil:sun"/>
                    <Icon v-else class="text-white" size="24" name="uil:moon"/>
                </ClientOnly>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const props = defineProps<{
    modelValue: boolean
}>()
const emit = defineEmits<{
    (e :'update:modelValue', modelValue: boolean) : void
}>()
function toggleSwitch() {
    emit('update:modelValue', !props.modelValue)
    if(colorMode.preference == 'dark') {
        colorMode.preference = 'light'
    }else {
        colorMode.preference = 'dark'
    }
}
</script>