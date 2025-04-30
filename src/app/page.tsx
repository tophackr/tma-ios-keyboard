import { Input, List, Section, Textarea } from '@telegram-apps/telegram-ui'

export default function Page() {
    return <List>
        {Array.from({length: 15}, (_, index) => (
            <Section key={index}>
                <Input placeholder={`Input #${index}`} />
                <Textarea placeholder={`Textarea #${index}`} />
            </Section>
        ))}
    </List>
}
