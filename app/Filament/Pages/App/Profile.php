<?php

namespace App\Filament\Pages\App;

use App\Filament\Actions\GeneratePasswordAction;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Pages\Auth\EditProfile;

class Profile extends EditProfile
{
    public function getBreadcrumbs(): array
    {
        return [
            null => __('Dashboard'),
            'profile' => __('Profile'),
        ];
    }

    public function form(Form $form): Form
    {
        /** @var TextInput $passwordComponent */
        $passwordComponent = $this->getPasswordFormComponent();
        $emailComponent = $this->getEmailFormComponent();

        // Make email readonly if user registered via social login
        if ($this->record->provider) {
            $emailComponent->disabled();
        }

        return $form->schema([
            Section::make('المعلومات الشخصية')
                ->description('تحديث معلومات حسابك')
                ->inlineLabel(false)
                ->schema([
                    $this->getNameFormComponent(),
                    $emailComponent,
                    $passwordComponent->suffixActions([
                        GeneratePasswordAction::make(),
                    ]),
                    $this->getPasswordConfirmationFormComponent(),
                ]),

            Section::make('معلومات التوصيل')
                ->description('عنوان التوصيل الخاص بك')
                ->schema([
                    TextInput::make('phone')
                        ->label('رقم الجوال')
                        ->tel()
                        ->required(),
                    TextInput::make('address')
                        ->label('العنوان')
                        ->required(),
                    TextInput::make('city')
                        ->label('المدينة')
                        ->required(),
                    TextInput::make('state')
                        ->label('المنطقة')
                        ->required(),
                    TextInput::make('postal_code')
                        ->label('الرمز البريدي')
                        ->required(),
                ]),
        ]);
    }
}
