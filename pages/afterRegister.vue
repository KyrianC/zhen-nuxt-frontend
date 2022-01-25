<template>
  <div
    class="bg-secondaryBackground text-center min-h-screen flex flex-col justify-center items-center"
  >
    <h1 class="text-2xl font-bold m-4">{{ $t('title') }}</h1>
    <p class="text-lg opacity-80">{{ $t('sub_title') }}</p>
  </div>
</template>

<i18n lang="yaml">
  en:
    title: "Thank you for registering"
    sub_title: "We sent you a confirmation email. Please verify your email address before continuing further"
  zh:
    title: "感谢您注册"
    sub_title: "我们向您发送了一封确认电子邮件。 请在继续之前验证您的电子邮件地址"
</i18n>
